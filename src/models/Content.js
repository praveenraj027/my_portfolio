const { mongoose } = require('../db');

// One singleton document holds the whole editable content tree.
// Mixed type = we store the content object as-is and validate shape in the route layer.
const contentSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.models.Content || mongoose.model('Content', contentSchema);
