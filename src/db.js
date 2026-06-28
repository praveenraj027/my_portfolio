const mongoose = require('mongoose');

// Cache the connection on the global object so it survives across warm serverless
// invocations (Vercel) and is created only once on a long-lived server.
let cached = global._ppMongoose;
if (!cached) cached = global._ppMongoose = { conn: null, promise: null };

async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error(
      'MONGODB_URI is not set. Copy .env.example to .env (or set it in your host) and add your MongoDB Atlas connection string.'
    );
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose
      .connect(mongoUri, { serverSelectionTimeoutMS: 15000, maxPoolSize: 5 })
      .then((m) => {
        console.log('[db] connected to MongoDB');
        return m;
      })
      .catch((e) => {
        cached.promise = null; // allow retry on next call
        throw e;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectDB, mongoose };
