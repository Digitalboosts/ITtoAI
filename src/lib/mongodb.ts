import { MongoClient, Db } from 'mongodb';

// Cache the client across hot-reloads in dev and across warm invocations in
// production so we don't open a new connection pool on every request.
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };

// Resolved lazily (on first request) rather than at import time, so that
// `next build` can import route modules without needing database credentials.
function getClientPromise(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGO_DB_URI;
    if (!uri) {
      throw new Error('Missing MONGO_DB_URI environment variable.');
    }
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // Don't cache a failed connection; let the next request retry.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGO_DB_NAME || 'ittoai');
}
