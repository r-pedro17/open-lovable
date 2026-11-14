import { NextRequest, NextResponse } from 'next/server';

// Public homepage, private engine. Upstream uses process-global sandbox state:
// DO NOT permit multi-user execution until isolation and durable state are added.
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  const path = request.nextUrl.pathname;
  const protectedPath = path === '/generation' || path.startsWith('/generation/') ||
    path === '/api' || path.startsWith('/api/');
  if (!protectedPath) return NextResponse.next();

  const username = process.env.STUDIO_USERNAME;
  const password = process.env.STUDIO_PASSWORD;

  // The showcase can launch with zero API keys, but engine endpoints remain closed.
  if (!username || !password) {
    return new NextResponse('The studio engine is not enabled yet.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
    });
  }

  const header = request.headers.get('authorization') || '';
  let supplied = '';
  if (header.startsWith('Basic ')) {
    try { supplied = atob(header.slice(6)); } catch { /* Invalid base64 */ }
  }
  const encoder = new TextEncoder();
  const a = encoder.encode(supplied);
  const b = encoder.encode(username + ':' + password);
  let difference = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    difference |= (a[i] || 0) ^ (b[i] || 0);
  }

  if (difference !== 0) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="OctoFrame Studio", charset="UTF-8"',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex',
      },
    });
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
