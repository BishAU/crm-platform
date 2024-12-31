import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Add paths that don't require authentication
const publicPaths = [
  '/login',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/error_pages'
];

export async function middleware(request: NextRequest) {
  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production'
  });

  // Handle authentication and redirects
  if (!token || !token.id || !token.exp || Date.now() >= Number(token.exp) * 1000) {
    const url = new URL('/login', request.url);
    if (request.nextUrl.pathname !== '/login') {
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    }
    return NextResponse.redirect(url);
  }

  // Redirect root to dashboard for authenticated users
  if (request.nextUrl.pathname === '/') {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/auth (NextAuth paths)
     * 2. /_next (Next.js internals)
     * 3. /favicon.ico, /images (static files)
     * 4. /error_pages (static error pages)
     */
    '/((?!api/auth|_next|favicon.ico|images|error_pages).*)',
  ],
};
