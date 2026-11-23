import { NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from './admin-auth';

/** Returns true if the request carries a valid admin session cookie. */
export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
