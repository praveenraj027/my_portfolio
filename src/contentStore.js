const Content = require('./models/Content');
const defaultContent = require('./defaultContent');

// Returns the live content document data, or the default if nothing is seeded yet.
async function getContent() {
  const doc = await Content.findOne({ key: 'site' }).lean();
  return doc && doc.data ? doc.data : defaultContent;
}

// Replace the whole content tree (upsert). The admin panel sends the full object.
async function saveContent(data) {
  const doc = await Content.findOneAndUpdate(
    { key: 'site' },
    { key: 'site', data },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();
  return doc.data;
}

module.exports = { getContent, saveContent, defaultContent };
