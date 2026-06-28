const express = require('express');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const Admin = require('../models/Admin');
const { setSession, clearSession, getSession } = require('../middleware/auth');

const router = express.Router();

// Throttle login attempts to slow brute force against the (already hidden) panel.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'too many attempts, try again later' }
});

router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }
  const admin = await Admin.findOne({ username: String(username).toLowerCase().trim() });
  // constant-ish time: always run a compare even if user missing
  const hash = admin ? admin.passwordHash : '$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinv';
  const ok = await bcrypt.compare(String(password), hash);
  if (!admin || !ok) return res.status(401).json({ error: 'invalid credentials' });

  setSession(res, { uid: String(admin._id), u: admin.username });
  res.json({ ok: true, username: admin.username });
});

router.post('/logout', (req, res) => {
  clearSession(res);
  res.json({ ok: true });
});

router.get('/me', (req, res) => {
  const s = getSession(req);
  if (!s) return res.status(401).json({ error: 'unauthorized' });
  res.json({ ok: true, username: s.u });
});

module.exports = router;
