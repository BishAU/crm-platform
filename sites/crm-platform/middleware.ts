import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

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
