import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/outfalls/:path*",
    "/people/:path*",
    "/water-authorities/:path*",
    "/indigenous-communities/:path*",
    "/politicians/:path*",
    "/observations/:path*",
    "/customers/:path*",
    "/facilities/:path*",
    "/outfall-types/:path*",
    "/marketing/:path*",
    "/support/:path*",
    "/settings/:path*",
    "/users/:path*",
  ],
};
