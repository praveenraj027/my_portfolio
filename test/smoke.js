/* End-to-end smoke test:
   - spins up an in-memory MongoDB
   - seeds admin + content
   - boots the real server.js
   - exercises the API (auth, content read/write, dsa, hidden route, 404)
   - drives the portfolio + admin in a headless browser
   Run: npm run smoke
*/
const path = require('path');
const http = require('http');

const PORT = 4137;
const ROUTE = 'studio-test-7f3a91';
const USER = 'praveen';
const PASS = 'supersecret123';

process.env.PORT = String(PORT);
process.env.ADMIN_ROUTE = ROUTE;
process.env.SESSION_SECRET = 'test-secret-' + 'x'.repeat(40);
process.env.NODE_ENV = 'test';

let assertions = 0, failures = 0;
function ok(cond, msg) {
  assertions++;
  if (cond) console.log('  ✓ ' + msg);
  else { failures++; console.log('  ✗ ' + msg); }
}

function waitFor(url, ms = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http
        .get(url, (res) => { res.resume(); resolve(); })
        .on('error', () => {
          if (Date.now() - start > ms) reject(new Error('server did not start'));
          else setTimeout(tick, 200);
        });
    };
    tick();
  });
}

async function main() {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri('portfolio');

  // seed
  process.env.ADMIN_USERNAME = USER;
  process.env.ADMIN_PASSWORD = PASS;
  const bcrypt = require('bcryptjs');
  const { connectDB, mongoose } = require('../src/db');
  await connectDB();
  const Admin = require('../src/models/Admin');
  const Content = require('../src/models/Content');
  const defaultContent = require('../src/defaultContent');
  await Admin.findOneAndUpdate(
    { username: USER },
    { username: USER, passwordHash: await bcrypt.hash(PASS, 10) },
    { upsert: true }
  );
  await Content.findOneAndUpdate({ key: 'site' }, { key: 'site', data: defaultContent }, { upsert: true });

  // boot the actual server (it will reuse the open mongoose connection)
  require('../server.js');
  await waitFor(`http://localhost:${PORT}/healthz`);
  console.log('\n[server up]\n');

  const base = `http://localhost:${PORT}`;
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const ctx = await browser.newContext();

  // --- API via fetch (Node 18+ global fetch) ---
  console.log('API:');
  let r = await fetch(`${base}/api/content`);
  let c = await r.json();
  ok(r.status === 200 && c.hero && c.hero.nameLine1 === 'PRAVEEN', 'GET /api/content returns content');

  r = await fetch(`${base}/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: USER, password: 'wrong' }) });
  ok(r.status === 401, 'login with wrong password → 401');

  r = await fetch(`${base}/api/content`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(c) });
  ok(r.status === 401, 'PUT /api/content without auth → 401');

  // real login, capture cookie
  r = await fetch(`${base}/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: USER, password: PASS }) });
  ok(r.status === 200, 'login with correct password → 200');
  const cookie = (r.headers.get('set-cookie') || '').split(';')[0];
  ok(/pp_session=/.test(cookie), 'login sets pp_session cookie');

  // edit a value and save
  c.hero.nameLine1 = 'PRAVEEN-EDITED';
  c.contact.email = 'real@praveenrajak.dev';
  r = await fetch(`${base}/api/content`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Cookie: cookie }, body: JSON.stringify(c) });
  ok(r.status === 200, 'PUT /api/content with auth → 200');

  r = await fetch(`${base}/api/content`);
  c = await r.json();
  ok(c.hero.nameLine1 === 'PRAVEEN-EDITED', 'edit persisted to DB');

  // invalid payload rejected
  r = await fetch(`${base}/api/content`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Cookie: cookie }, body: JSON.stringify({ hero: {} }) });
  ok(r.status === 400, 'PUT with missing sections → 400');

  r = await fetch(`${base}/api/dsa`);
  const d = await r.json();
  ok(r.status === 200 && typeof d.totalSolved === 'number', 'GET /api/dsa returns numeric totalSolved (' + d.totalSolved + ')');
  console.log('    live: LC total=' + (d.leetcode && d.leetcode.total) + ' rating=' + (d.leetcode && d.leetcode.rating) + ' | CF rating=' + (d.codeforces && d.codeforces.rating) + ' max=' + (d.codeforces && d.codeforces.maxRating));

  // hidden route + 404 behaviour
  r = await fetch(`${base}/${ROUTE}`);
  const adminHtml = await r.text();
  ok(r.status === 200 && /Studio/.test(adminHtml) && /Sign in/.test(adminHtml), 'secret route serves admin login');
  r = await fetch(`${base}/admin`);
  ok(r.status === 404, '/admin → 404 (not the real route)');
  r = await fetch(`${base}/totally-random-path`);
  ok(r.status === 404, 'random path → 404');
  r = await fetch(`${base}/api/me`);
  ok(r.status === 401, '/api/me without session → 401');

  // --- Browser: portfolio renders edited content ---
  console.log('\nBrowser — portfolio:');
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(`${base}/`, { waitUntil: 'load' });
  await page.waitForTimeout(4000);
  const heroName = await page.evaluate(() => {
    const h = document.getElementById('pp-hero-h');
    return h ? h.textContent : '';
  });
  ok(/PRAVEEN-EDITED/.test(heroName), 'portfolio shows edited hero name from DB');
  const loaderGone = await page.evaluate(() => !document.getElementById('pp-loader'));
  ok(loaderGone, 'loader cleared');
  await page.evaluate(() => window.__pp.go('contact'));
  await page.waitForTimeout(1200);
  const email = await page.evaluate(() => document.querySelector('[href^="mailto:"]').getAttribute('href'));
  ok(/real@praveenrajak\.dev/.test(email), 'contact email reflects edit');
  await page.evaluate(() => window.__pp.go('dsa'));
  await page.waitForTimeout(2500);
  const heat = await page.evaluate(() => document.querySelectorAll('#pp-heatmap .pp-hm').length);
  ok(heat > 0, 'DSA heatmap rendered (' + heat + ' cells)');
  await page.screenshot({ path: 'test-portfolio.png' });
  ok(errors.length === 0, 'no console/page errors on portfolio (' + errors.length + ')');
  if (errors.length) errors.slice(0, 5).forEach((e) => console.log('     ERR: ' + e));

  // --- Browser: admin login flow ---
  console.log('\nBrowser — admin:');
  const ap = await ctx.newPage();
  await ap.goto(`${base}/${ROUTE}`, { waitUntil: 'load' });
  await ap.waitForTimeout(500);
  const loginVisible = await ap.evaluate(() => getComputedStyle(document.getElementById('login')).display !== 'none');
  ok(loginVisible, 'admin shows login when unauthenticated');
  await ap.fill('#u', USER);
  await ap.fill('#p', PASS);
  await ap.click('#loginBtn');
  await ap.waitForTimeout(1200);
  const appVisible = await ap.evaluate(() => getComputedStyle(document.getElementById('app')).display !== 'none');
  ok(appVisible, 'admin logs in and shows editor');
  const tabCount = await ap.evaluate(() => document.querySelectorAll('#tabs .tab').length);
  ok(tabCount === 7, 'editor shows all 7 section tabs');
  // edit name back via the UI and save
  await ap.evaluate(() => {
    const ta = document.querySelector('#panes input'); // first hero field = badge; find name line 1
    const labels = [...document.querySelectorAll('#panes .field')];
    const f = labels.find((d) => d.querySelector('.lbl') && /Name — line 1/.test(d.querySelector('.lbl').textContent));
    const inp = f.querySelector('input');
    inp.value = 'PRAVEEN';
    inp.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await ap.click('#saveBtn');
  await ap.waitForTimeout(800);
  const saved = await (await fetch(`${base}/api/content`)).json();
  ok(saved.hero.nameLine1 === 'PRAVEEN', 'admin UI save persisted (name reset to PRAVEEN)');
  await ap.screenshot({ path: 'test-admin.png' });

  await browser.close();
  await mongoose.connection.close();
  await mongod.stop();

  console.log(`\n${failures === 0 ? '✅ ALL PASS' : '❌ FAILURES'} — ${assertions - failures}/${assertions} assertions passed\n`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error('smoke crashed:', e); process.exit(1); });
