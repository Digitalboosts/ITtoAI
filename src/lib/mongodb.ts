import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGO_DB_URI;
const dbName = process.env.MONGO_DB_NAME || 'ittoai';

if (!uri) {
  throw new Error('Missing MONGO_DB_URI environment variable.');
}

// Cache the client across hot-reloads in dev and across warm invocations in
// production so we don't open a new connection pool on every request.
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };

const client = globalForMongo._mongoClientPromise ? undefined : new MongoClient(uri);
const clientPromise: Promise<MongoClient> = globalForMongo._mongoClientPromise ?? client!.connect();

if (!globalForMongo._mongoClientPromise) {
  globalForMongo._mongoClientPromise = clientPromise;
}

export async function getDb(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

export default clientPromise;
