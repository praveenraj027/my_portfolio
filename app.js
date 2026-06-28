require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { connectDB } = require('./src/db');
const authRoutes = require('./src/routes/auth');
const contentRoutes = require('./src/routes/content');
const dsaRoutes = require('./src/routes/dsa');

const app = express();

// The hidden admin slug. No leading slash. Anyone who doesn't know it gets a 404.
const ADMIN_ROUTE = (process.env.ADMIN_ROUTE || 'studio-7f3a91')
  .replace(/^\/+/, '')
  .replace(/[^a-zA-Z0-9_-]/g, '');

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Ensure the DB is connected before any API call. On a long-lived server this is
// a no-op after the first connect; on Vercel serverless it lazily connects (and
// reuses the cached connection) on each cold start.
app.use('/api', (req, res, next) => {
  connectDB()
    .then(() => next())
    .catch((e) => {
      console.error('[db] connect failed for', req.path, e.message);
      res.status(503).json({ error: 'database unavailable' });
    });
});

// ---- API ----
app.use('/api', authRoutes);
app.use('/api', contentRoutes);
app.use('/api', dsaRoutes);

app.get('/healthz', (req, res) => res.json({ ok: true }));

// ---- Hidden admin panel (served only at the secret slug) ----
const adminHtmlPath = path.join(__dirname, 'admin', 'admin.html');
app.get(`/${ADMIN_ROUTE}`, (req, res) => {
  res.set('X-Robots-Tag', 'noindex, nofollow');
  res.sendFile(adminHtmlPath);
});

// ---- Public portfolio (static) ----
// On Vercel, files in public/ are also served by the CDN before requests reach
// this function; this static handler covers local/Render and any fall-through.
app.use(
  express.static(path.join(__dirname, 'public'), {
    extensions: ['html'],
    setHeaders(res, filePath) {
      if (filePath.endsWith('index.html')) res.set('Cache-Control', 'no-cache');
    }
  })
);

// ---- Generic 404 (reveals nothing about the admin route) ----
app.use((req, res) => {
  res.status(404).type('html').send(
    '<!doctype html><meta charset="utf-8"><title>404</title>' +
      '<body style="background:#05070d;color:#8a95ab;font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0">' +
      '<div style="text-align:center"><div style="font-size:48px;font-weight:700;color:#e8ecf4">404</div>' +
      '<div style="margin-top:8px">page not found · <a style="color:#22d3ee" href="/">go home</a></div></div>'
  );
});

app.set('adminRoute', ADMIN_ROUTE);
module.exports = app;
