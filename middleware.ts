import { NextRequest, NextResponse } from 'next/server';

// Private single-operator guard. Do not enable multi-user access until
// sandbox and conversation state are explicitly scoped and durable.
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  const username = process.env.STUDIO_USERNAME;
  const password = process.env.STUDIO_PASSWORD;
  if (!username || !password) {
    return new NextResponse('Studio is locked: configure STUDIO_USERNAME and STUDIO_PASSWORD.', { status: 503 });
  }

  const header = request.headers.get('authorization') || '';
  let supplied = '';
  if (header.startsWith('Basic ')) {
    try { supplied = atob(header.slice(6)); } catch { /* Invalid credentials */ }
  }

  // Compare complete hashes to avoid timing differences on direct credentials.
  // The middleware is an access gate, NOT multi-tenant session isolation.
  const expected = username + ':' + password;
  const encoder = new TextEncoder();
  const a = encoder.encode(supplied);
  const b = encoder.encode(expected);
  let difference = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let i = 0; i < length; i++) difference |= (a[i] || 0) ^ (b[i] || 0);

  if (difference !== 0) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Private Website Studio", charset="UTF-8"', 'Cache-Control': 'no-store' },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
