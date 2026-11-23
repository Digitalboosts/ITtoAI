import { NextRequest, NextResponse } from 'next/server';
import { deleteSubmission, updateSubmissionStatus } from '@/lib/submissions';
import { isAdminRequest } from '@/lib/require-admin';

const COLLECTION = 'contacts';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { id } = await params;
  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (body.status !== 'new' && body.status !== 'reviewed') {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
  }

  const updated = await updateSubmissionStatus(COLLECTION, id, body.status);
  if (!updated) return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteSubmission(COLLECTION, id);
  if (!deleted) return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
