const express = require('express');
const { getContent } = require('../contentStore');
const { getDSA } = require('../services/dsa');
const { getSession } = require('../middleware/auth');

const router = express.Router();

// Public: live DSA stats for whatever usernames are currently configured.
// Authenticated callers may pass ?force=1 to bypass the cache.
router.get('/dsa', async (req, res) => {
  try {
    const content = await getContent();
    const lc = content.dsa && content.dsa.leetcodeUser;
    const cf = content.dsa && content.dsa.codeforcesUser;
    const force = req.query.force === '1' && !!getSession(req);
    const data = await getDSA(lc, cf, { force });
    res.set('Cache-Control', 'public, max-age=300');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'failed to fetch DSA stats' });
  }
});

module.exports = router;
