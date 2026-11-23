import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { createSubmission, listSubmissions } from '@/lib/submissions';
import { isAdminRequest } from '@/lib/require-admin';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';

const COLLECTION = 'contacts';

export async function POST(request: NextRequest) {
  if (isRateLimited(`contact:${getClientIp(request)}`)) {
    return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.', fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const id = await createSubmission(COLLECTION, parsed.data);
    return NextResponse.json({ id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const submissions = await listSubmissions(COLLECTION);
    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ error: 'Failed to load submissions.' }, { status: 500 });
  }
}
