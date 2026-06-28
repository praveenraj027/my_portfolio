// Vercel serverless entry — hands every request to the Express app.
// No app.listen() here; Vercel invokes the exported handler per request.
module.exports = require('../app');
