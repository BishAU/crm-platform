import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Allow RSC requests through without modification
    if (req.nextUrl.search.includes('_rsc')) {
      return NextResponse.next();
    }

    // Return early if it's the login page
    if (req.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }

    // Return early for health check endpoints
    if (req.nextUrl.pathname === '/api/ready' || req.nextUrl.pathname === '/api/health') {
      return NextResponse.next();
    }

    // Add auth header for API routes
    if (req.nextauth.token) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('Authorization', `Bearer ${req.nextauth.token.sub}`);

      // For API routes, ensure proper handling of dynamic segments
      if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }

      // For other authenticated routes
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow RSC requests through
        if (req.nextUrl.search.includes('_rsc')) {
          return true;
        }

        // Allow login page
        if (req.nextUrl.pathname === '/login') {
          return true;
        }

        // Allow health check endpoints
        if (req.nextUrl.pathname === '/api/ready' || req.nextUrl.pathname === '/api/health') {
          return true;
        }

        // Allow API routes with valid token
        if (req.nextUrl.pathname.startsWith('/api/') && token) {
          return true;
        }

        // For all other routes, require token
        return !!token;
      },
    },
  }
);

// Configure the paths that require authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication routes)
     * - api/ready (health check)
     * - api/health (health check)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     */
    '/((?!api/auth|api/ready|api/health|_next/static|_next/image|favicon.ico|images/).*)',
  ],
};