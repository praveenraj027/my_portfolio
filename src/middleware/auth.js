const jwt = require('jsonwebtoken');

const COOKIE = 'pp_session';

function sign(payload) {
  return jwt.sign(payload, process.env.SESSION_SECRET, { expiresIn: '7d' });
}

function setSession(res, payload) {
  res.cookie(COOKIE, sign(payload), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
  });
}

function clearSession(res) {
  res.clearCookie(COOKIE, { path: '/' });
}

function getSession(req) {
  const token = req.cookies && req.cookies[COOKIE];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SESSION_SECRET);
  } catch {
    return null;
  }
}

// Gate for the admin API. Returns 401 (not 404) on the API surface;
// the secret of the system is the route slug, not the existence of /api/admin.
function requireAuth(req, res, next) {
  const session = getSession(req);
  if (!session) return res.status(401).json({ error: 'unauthorized' });
  req.admin = session;
  next();
}

module.exports = { setSession, clearSession, getSession, requireAuth, COOKIE };
