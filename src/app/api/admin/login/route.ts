import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, checkAdminPassword, createSessionToken } from '@/lib/admin-auth';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  if (isRateLimited(`admin-login:${getClientIp(request)}`)) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body.password || !checkAdminPassword(body.password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return response;
}
