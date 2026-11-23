import { ObjectId } from 'mongodb';
import { getDb } from './mongodb';
import type { SubmissionStatus } from './validation';

export async function createSubmission(collection: string, data: Record<string, unknown>) {
  const db = await getDb();
  const doc = { ...data, status: 'new' as SubmissionStatus, createdAt: new Date() };
  const result = await db.collection(collection).insertOne(doc);
  return result.insertedId.toString();
}

export async function listSubmissions(collection: string) {
  const db = await getDb();
  return db.collection(collection).find({}).sort({ createdAt: -1 }).toArray();
}

export async function updateSubmissionStatus(collection: string, id: string, status: SubmissionStatus): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const result = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return result.matchedCount > 0;
}

export async function deleteSubmission(collection: string, id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
