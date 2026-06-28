const express = require('express');
const { getContent, saveContent } = require('../contentStore');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Public: the portfolio fetches this on load.
router.get('/content', async (req, res) => {
  try {
    const data = await getContent();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'failed to load content' });
  }
});

// Admin: replace the whole content tree.
router.put('/content', requireAuth, async (req, res) => {
  const data = req.body;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ error: 'invalid content payload' });
  }
  // Light sanity check: require the top-level sections to exist.
  const required = ['hero', 'about', 'dsa', 'projects', 'experience', 'skills', 'contact'];
  for (const k of required) {
    if (!data[k] || typeof data[k] !== 'object') {
      return res.status(400).json({ error: `missing section: ${k}` });
    }
  }
  try {
    const saved = await saveContent(data);
    res.json({ ok: true, data: saved });
  } catch (e) {
    res.status(500).json({ error: 'failed to save content' });
  }
});

module.exports = router;
