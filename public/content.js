/* ============================================================================
   content.js — loads editable content + live DSA stats from the API and
   renders the dynamic sections of the portfolio. Runs BEFORE the 3D component
   mounts, so all animation hooks (data-pg, data-count, .pp-tilt, #pp-hero-h…)
   are present when the component reads them.

   If the API is unreachable the static markup in index.html stays as-is, so the
   site always renders something sensible.
============================================================================ */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  // Admin-authored rich text (paragraphs / descriptions) may contain trusted <b> tags.
  const rich = (s) => String(s == null ? '' : s);
  const safeUrl = (u) => {
    const s = String(u == null ? '#' : u).trim();
    if (/^\s*javascript:/i.test(s)) return '#';
    return s || '#';
  };
  const suffixColor = (suf) => (suf === '×' ? '#e879f9' : '#22d3ee');

  /* ---------------------------- section builders --------------------------- */

  function buildHero(h) {
    const stat = (s) => {
      const sufColor = s.suffixColor || suffixColor(s.suffix);
      const suf = s.suffix
        ? `<span style="font-weight:700;font-size:22px;color:${sufColor}">${esc(s.suffix)}</span>`
        : '';
      const live = s.live ? ` data-dsa="${esc(s.live)}"` : '';
      return `<div><div style="display:flex;align-items:baseline;gap:2px"><span class="pp-hcount" data-count="${Number(s.value) || 0}"${live} style="font-weight:700;font-size:clamp(26px,3vw,40px);line-height:1;color:#e8ecf4">0</span>${suf}</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;color:#8a95ab;margin-top:8px">${esc(s.label)}</div></div>`;
    };
    return `
    <div data-pg style="display:inline-flex;align-items:center;gap:9px;align-self:flex-start;padding:8px 15px;border:1px solid rgba(34,211,238,.3);border-radius:30px;background:rgba(34,211,238,.06);margin-bottom:24px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.14em;color:#bfe9ff"><span style="width:8px;height:8px;border-radius:50%;background:#22e08a;box-shadow:0 0 10px #22e08a;animation:pp-pulse 2s ease-in-out infinite"></span>${esc(h.badge)}</div>
    <div data-pg style="font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.32em;color:#22d3ee;margin-bottom:22px">${esc(h.eyebrow)}</div>
    <h1 id="pp-hero-h" style="font-weight:700;font-size:clamp(46px,10vw,148px);line-height:.9;letter-spacing:-.03em;margin:0">${esc(h.nameLine1)}<br>${esc(h.nameLine2)}</h1>
    <p data-pg style="max-width:560px;margin:32px 0 0;font-size:clamp(15px,1.5vw,19px);line-height:1.6;color:#aeb8cc">${rich(h.intro)}</p>
    <div data-pg style="display:flex;gap:14px;margin-top:36px;flex-wrap:wrap">
      <a data-hover data-route="${esc(h.ctaPrimary.route)}" href="#/${esc(h.ctaPrimary.route)}" style="padding:14px 26px;border-radius:40px;background:#22d3ee;color:#05070d;font-weight:600;font-size:14px">${esc(h.ctaPrimary.label)}</a>
      <a data-hover data-route="${esc(h.ctaSecondary.route)}" href="#/${esc(h.ctaSecondary.route)}" style="padding:14px 26px;border-radius:40px;border:1px solid rgba(255,255,255,.22);color:#e8ecf4;font-weight:600;font-size:14px">${esc(h.ctaSecondary.label)}</a>
    </div>
    <div data-pg style="display:flex;gap:clamp(24px,4.5vw,58px);margin-top:48px;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,.08);padding-top:28px">
      ${(h.stats || []).map(stat).join('')}
    </div>`;
  }

  function buildAbout(a) {
    const cards = (a.cards || [])
      .map((c) => {
        const val = c.gradient
          ? `<div style="font-weight:700;font-size:34px;background:linear-gradient(90deg,#22d3ee,#e879f9);-webkit-background-clip:text;background-clip:text;color:transparent">${esc(c.value)}</div>`
          : `<div style="font-weight:700;font-size:34px;color:#e8ecf4">${esc(c.value)}</div>`;
        return `<div data-pg data-hover style="border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:22px;background:rgba(255,255,255,.02)">${val}<div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#8a95ab;margin-top:4px">${rich(c.label)}</div></div>`;
      })
      .join('');
    const paras = (a.paragraphs || [])
      .map(
        (p, i) =>
          `<p data-pg style="font-size:clamp(15px,1.4vw,18px);line-height:1.7;color:#aeb8cc;margin:0${i < a.paragraphs.length - 1 ? ' 0 18px' : ''}">${rich(p)}</p>`
      )
      .join('');
    return `
    <div>
      <div data-pg style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.28em;color:#d946ef;margin-bottom:22px">${esc(a.eyebrow)}</div>
      <h2 data-pg style="font-weight:700;font-size:clamp(30px,4.4vw,58px);line-height:1.04;letter-spacing:-.02em;margin:0 0 28px">${rich(a.heading)}</h2>
      ${paras}
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">${cards}</div>`;
  }

  function buildProjects(p) {
    const f = p.featured || {};
    const chip = (t, pad) =>
      `<span style="padding:${pad};border:1px solid rgba(255,255,255,.16);border-radius:30px">${esc(t)}</span>`;
    const featured = `
      <a href="${safeUrl(f.url)}"${f.url && f.url !== '#' ? ' target="_blank" rel="noopener"' : ''} data-pg data-hover class="pp-tilt" style="display:block;border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:clamp(26px,4vw,46px);background:linear-gradient(135deg,rgba(34,211,238,.08),rgba(217,70,239,.05));position:relative;overflow:hidden;will-change:transform">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap">
          <div style="max-width:640px">
            <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:#22d3ee;margin-bottom:14px">${esc(f.tag)}</div>
            <h3 style="font-weight:700;font-size:clamp(26px,3.4vw,42px);margin:0 0 14px;letter-spacing:-.02em">${esc(f.title)}</h3>
            <p style="font-size:clamp(14px,1.4vw,17px);line-height:1.6;color:#aeb8cc;margin:0">${rich(f.desc)}</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:22px;font-family:'JetBrains Mono',monospace;font-size:11px">${(f.tags || []).map((t) => chip(t, '6px 12px')).join('')}</div>
          </div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#22d3ee;white-space:nowrap">${esc(f.cta || 'view ↗')}</span>
        </div>
      </a>`;
    const colors = ['#e879f9', '#22d3ee'];
    const items = (p.items || [])
      .map((it, i) => {
        const col = colors[i % colors.length];
        const tag = it.url && it.url !== '#'
          ? ['a', ` href="${safeUrl(it.url)}" target="_blank" rel="noopener"`]
          : ['div', ''];
        return `<${tag[0]}${tag[1]} data-pg data-hover class="pp-tilt" style="display:block;border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:clamp(24px,3vw,36px);background:rgba(255,255,255,.02);will-change:transform">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:${col};margin-bottom:12px">${esc(it.tag)}</div>
          <h3 style="font-weight:700;font-size:clamp(22px,2.6vw,30px);margin:0 0 12px;letter-spacing:-.01em">${esc(it.title)}</h3>
          <p style="font-size:15px;line-height:1.6;color:#aeb8cc;margin:0">${rich(it.desc)}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px;font-family:'JetBrains Mono',monospace;font-size:11px">${(it.tags || []).map((t) => chip(t, '5px 11px')).join('')}</div>
        </${tag[0]}>`;
      })
      .join('');
    return `
    <div data-pg style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.28em;color:#d946ef;margin-bottom:18px">${esc(p.eyebrow)}</div>
    <h2 data-pg style="font-weight:700;font-size:clamp(30px,5vw,64px);line-height:1.02;letter-spacing:-.02em;margin:0 0 44px">${esc(p.heading)}</h2>
    <div style="display:flex;flex-direction:column;gap:20px" data-grid="projects">
      ${featured}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px" data-grid="projrow">${items}</div>
    </div>`;
  }

  function buildExperience(x) {
    const items = (x.items || [])
      .map((it, i) => {
        const last = i === x.items.length - 1;
        const node = `<div class="pp-tl-node" style="position:absolute;left:-34px;top:4px;width:14px;height:14px;border-radius:50%;background:${esc(it.color)};box-shadow:0 0 16px ${esc(it.color)}"></div>`;
        return `<div data-tl style="position:relative${last ? '' : ';margin-bottom:42px'}">
          ${node}
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:${esc(it.color)};letter-spacing:.12em">${esc(it.badge)}</div>
          <h3 style="font-weight:700;font-size:clamp(20px,2.4vw,28px);margin:8px 0 6px">${esc(it.title)}</h3>
          <p style="font-size:15px;line-height:1.6;color:#aeb8cc;margin:0;max-width:620px">${rich(it.desc)}</p>
        </div>`;
      })
      .join('');
    return `
    <div data-pg style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.28em;color:#22d3ee;margin-bottom:18px">${esc(x.eyebrow)}</div>
    <h2 data-pg style="font-weight:700;font-size:clamp(30px,5vw,64px);line-height:1.02;letter-spacing:-.02em;margin:0 0 50px">${esc(x.heading)}</h2>
    <div style="position:relative;padding-left:34px" data-grid="timeline">
      <div id="pp-tl-line" style="position:absolute;left:6px;top:6px;bottom:6px;width:2px;background:linear-gradient(180deg,#22d3ee,#d946ef);transform-origin:top center"></div>
      ${items}
    </div>`;
  }

  function buildSkillsLeft(s) {
    const rows = (s.groups || [])
      .map(
        (g) =>
          `<div style="display:flex;gap:12px"><span style="color:${esc(g.color)};min-width:90px">${esc(g.label)}</span><span style="color:#aeb8cc">${esc(g.items)}</span></div>`
      )
      .join('');
    return `
    <div data-pg style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.28em;color:#d946ef;margin-bottom:18px">${esc(s.eyebrow)}</div>
    <h2 data-pg style="font-weight:700;font-size:clamp(30px,4.6vw,58px);line-height:1.02;letter-spacing:-.02em;margin:0 0 26px">${esc(s.heading)}</h2>
    <p data-pg style="font-size:clamp(15px,1.4vw,18px);line-height:1.7;color:#aeb8cc;margin:0 0 26px;max-width:440px">${rich(s.intro)}</p>
    <div data-pg style="display:flex;flex-direction:column;gap:14px;font-family:'JetBrains Mono',monospace;font-size:13px;max-width:440px">${rows}</div>`;
  }

  function buildContact(c) {
    const socials = (c.socials || [])
      .map(
        (s) =>
          `<a data-hover href="${safeUrl(s.url)}"${s.url && s.url !== '#' ? ' target="_blank" rel="noopener"' : ''}>${esc(s.label)}</a>`
      )
      .join('');
    return `
    <div id="pp-burst" style="position:absolute;top:42%;left:50%;width:600px;height:600px;transform:translate(-50%,-50%) scale(0);border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.3),rgba(217,70,239,.14) 40%,transparent 68%);pointer-events:none;opacity:0"></div>
    <div data-pg style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.28em;color:#22d3ee;margin-bottom:26px;position:relative">${esc(c.eyebrow)}</div>
    <h2 id="pp-contact-h" style="font-weight:700;font-size:clamp(40px,10vw,128px);line-height:.92;letter-spacing:-.03em;margin:0;position:relative">${esc(c.headingLine1)}<br>${esc(c.headingLine2)}</h2>
    <a data-pg data-hover class="pp-magnetic" href="mailto:${esc(c.email)}" style="margin-top:42px;display:inline-block;padding:18px 40px;border-radius:50px;background:linear-gradient(120deg,#22d3ee,#d946ef);color:#05070d;font-weight:700;font-size:16px;will-change:transform;position:relative">${esc(c.ctaLabel)}</a>
    <div data-pg style="margin-top:34px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#5f6b80;position:relative">${esc(c.email)}${c.note ? ' · ' + esc(c.note) : ''}</div>
    <div data-pg style="display:flex;gap:24px;margin-top:28px;font-family:'JetBrains Mono',monospace;font-size:13px;flex-wrap:wrap;justify-content:center;position:relative">${socials}</div>`;
  }

  /* ------------------------------ apply content ---------------------------- */

  function applyContent(c) {
    if (!c) return;
    try {
      if (c.hero && $('pp-hero-inner')) $('pp-hero-inner').innerHTML = buildHero(c.hero);
      if (c.about && $('pp-about-inner')) $('pp-about-inner').innerHTML = buildAbout(c.about);
      if (c.projects && $('pp-projects-inner')) $('pp-projects-inner').innerHTML = buildProjects(c.projects);
      if (c.experience && $('pp-exp-inner')) $('pp-exp-inner').innerHTML = buildExperience(c.experience);
      if (c.skills && $('pp-skills-left')) $('pp-skills-left').innerHTML = buildSkillsLeft(c.skills);
      if (c.contact && $('pp-contact-inner')) $('pp-contact-inner').innerHTML = buildContact(c.contact);

      // DSA section header (the grid itself stays — it's patched with live numbers)
      if (c.dsa) {
        if ($('pp-dsa-eyebrow')) $('pp-dsa-eyebrow').textContent = c.dsa.eyebrow || '';
        if ($('pp-dsa-heading')) $('pp-dsa-heading').innerHTML = rich(c.dsa.heading || '');
        if ($('pp-dsa-note')) $('pp-dsa-note').innerHTML = rich(c.dsa.note || '');
      }

      // skills sphere tags consumed by the 3D component
      if (c.skills && Array.isArray(c.skills.sphereTags) && c.skills.sphereTags.length) {
        window.__SKILLS_TAGS__ = c.skills.sphereTags.slice();
      }
    } catch (e) {
      console.warn('[content] apply failed', e);
    }
  }

  /* -------------------------------- apply DSA ------------------------------ */

  function setCount(el, value) {
    if (!el) return;
    el.dataset.count = String(value);
    el.textContent = '0';
  }

  function applyDSA(d) {
    if (!d) return;
    try {
      document.querySelectorAll('[data-dsa="totalSolved"]').forEach((el) => {
        if (typeof d.totalSolved === 'number') setCount(el, d.totalSolved);
      });
      const lc = d.leetcode;
      if (lc) {
        document.querySelectorAll('[data-dsa="leetcodeRating"]').forEach((el) => {
          if (typeof lc.rating === 'number') setCount(el, lc.rating);
        });
        const lcTotal = (lc.easy || 0) + (lc.medium || 0) + (lc.hard || 0) || 1;
        const diffs = { easy: lc.easy || 0, medium: lc.medium || 0, hard: lc.hard || 0 };
        Object.keys(diffs).forEach((k) => {
          const ring = document.querySelector(`.pp-ring[data-diff="${k}"]`);
          if (ring) ring.dataset.ring = (diffs[k] / lcTotal).toFixed(3);
          const cnt = document.querySelector(`[data-diff-count="${k}"]`);
          setCount(cnt, diffs[k]);
        });
      }
      const cf = d.codeforces;
      if (cf) {
        const label = $('pp-cf-label');
        if (label && typeof cf.maxRating === 'number') {
          label.textContent = `CF max ${cf.maxRating} · live`;
        }
        if (cf.history && cf.history.length >= 2) drawCFChart(cf.history);
      }
    } catch (e) {
      console.warn('[content] applyDSA failed', e);
    }
  }

  function drawCFChart(history) {
    const svg = $('pp-chart-svg');
    if (!svg) return;
    const W = 560, top = 12, bot = 140;
    const ratings = history.map((h) => h.rating);
    const min = Math.min(...ratings), max = Math.max(...ratings);
    const span = max - min || 1;
    const n = ratings.length;
    const pts = ratings.map((r, i) => {
      const x = (i / (n - 1)) * W;
      const y = bot - ((r - min) / span) * (bot - top);
      return [Math.round(x * 100) / 100, Math.round(y * 100) / 100];
    });
    const line = 'M' + pts.map((p) => `${p[0]},${p[1]}`).join(' L');
    const fill = line + ` L${W},150 L0,150 Z`;
    const last = pts[pts.length - 1];
    svg.innerHTML =
      `<defs><linearGradient id="ppfill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22d3ee" stop-opacity=".35"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></linearGradient></defs>` +
      `<path d="${fill}" fill="url(#ppfill2)"/>` +
      `<path id="pp-chartline" d="${line}" fill="none" stroke="#22d3ee" stroke-width="2.5"/>` +
      `<circle cx="${last[0]}" cy="${last[1]}" r="4" fill="#e879f9"/>`;
  }

  /* -------------------------------- loader --------------------------------- */

  async function fetchJSON(url, ms) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try {
      const res = await fetch(url, { signal: ctrl.signal, credentials: 'same-origin' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } finally {
      clearTimeout(t);
    }
  }

  // Called by index.html's bootstrap BEFORE the 3D component mounts.
  window.PP_loadContent = async function () {
    const content = await fetchJSON('/api/content', 4000).catch((e) => {
      console.warn('[content] /api/content failed — using static fallback', e.message);
      return null;
    });
    if (content) applyContent(content);

    // DSA can be slower (Codeforces); give it a bit longer but don't block forever.
    const dsa = await fetchJSON('/api/dsa', 9000).catch((e) => {
      console.warn('[content] /api/dsa failed — keeping sample numbers', e.message);
      return null;
    });
    if (dsa) applyDSA(dsa);
  };
})();
