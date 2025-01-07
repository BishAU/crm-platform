import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function will be executed before the middleware
export default withAuth(
  function middleware(req) {
    // Add debugging
    console.log('Middleware executing for path:', req.nextUrl.pathname);
    console.log('Auth token present:', !!req.nextauth.token);
    
    // Allow the request to continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Add debugging
        console.log('Checking authorization, token present:', !!token);
        return !!token;
      }
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Update matcher to include exact dashboard route and all protected routes
export const config = {
  matcher: [
    // Required for exact matches
    "/dashboard",
    // Required for catch-all matches
    "/dashboard/:path*",
    "/outfalls",
    "/outfalls/:path*",
    "/people",
    "/people/:path*",
    "/water-authorities",
    "/water-authorities/:path*",
    "/indigenous-communities",
    "/indigenous-communities/:path*",
    "/politicians",
    "/politicians/:path*",
    "/observations",
    "/observations/:path*",
    "/customers",
    "/customers/:path*",
    "/facilities",
    "/facilities/:path*",
    "/outfall-types",
    "/outfall-types/:path*",
    "/marketing",
    "/marketing/:path*",
    "/support",
    "/support/:path*",
    "/settings",
    "/settings/:path*",
    "/users",
    "/users/:path*",
  ],
};
