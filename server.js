// Long-lived server entry (local dev + Render). For Vercel serverless, api/index.js
// imports the same app instead of calling listen().
require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./src/db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
  } catch (e) {
    console.error('[startup] DB connection failed:', e.message);
    // Still boot so the static site renders with fallback content; API will 503.
  }
  app.listen(PORT, () => {
    console.log(`[server] listening on :${PORT}`);
    console.log(`[server] admin panel at  /${app.get('adminRoute')}`);
  });
}

start();

module.exports = app;
