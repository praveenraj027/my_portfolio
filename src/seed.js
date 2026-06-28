// One-time (idempotent) seeding:
//   npm run seed
// Reads ADMIN_USERNAME / ADMIN_PASSWORD from the environment, creates/updates the
// admin account (password stored only as a bcrypt hash), and inserts the default
// content if none exists yet.
//
// Re-run with  RESEED_CONTENT=1 npm run seed  to overwrite content back to defaults.

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connectDB, mongoose } = require('./db');
const Admin = require('./models/Admin');
const Content = require('./models/Content');
const defaultContent = require('./defaultContent');

async function main() {
  const username = (process.env.ADMIN_USERNAME || '').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || '';

  if (!username || !password) {
    console.error('\n✗ ADMIN_USERNAME and ADMIN_PASSWORD must be set in the environment (.env).');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('\n✗ ADMIN_PASSWORD should be at least 8 characters.');
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.findOneAndUpdate(
    { username },
    { username, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log(`✓ admin "${username}" is ready (password stored as bcrypt hash).`);

  const existing = await Content.findOne({ key: 'site' });
  if (!existing || process.env.RESEED_CONTENT === '1') {
    await Content.findOneAndUpdate(
      { key: 'site' },
      { key: 'site', data: defaultContent },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(existing ? '✓ content reset to defaults.' : '✓ default content seeded.');
  } else {
    console.log('• content already present — left untouched (use RESEED_CONTENT=1 to overwrite).');
  }

  await mongoose.connection.close();
  console.log('\nDone. You can now log in at  /<ADMIN_ROUTE>\n');
  process.exit(0);
}

main().catch((e) => {
  console.error('seed failed:', e);
  process.exit(1);
});
