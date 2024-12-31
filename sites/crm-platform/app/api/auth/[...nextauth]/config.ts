import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '../../../lib/prisma';
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always use the current origin as baseUrl
      const currentBaseUrl = process.env.NEXTAUTH_URL || baseUrl;
      if (url.startsWith("/")) {
        return `${currentBaseUrl}${url}`;
      }
      else if (new URL(url).origin === currentBaseUrl) {
        return url;
      }
      return currentBaseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Verify token is valid and not expired
      if (!token || !token.id || !token.exp || Date.now() >= Number(token.exp) * 1000) {
        throw new Error('Invalid session');
      }

      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password || !bcrypt.compareSync(credentials.password, user.password)) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async signOut({ token, session }) {
      if (token) {
        // Clear all sessions and tokens for this user
        await Promise.all([
          // Clear database sessions
          prisma.session.deleteMany({
            where: { userId: token.id as string }
          }),
          // Clear JWT tokens
          prisma.account.updateMany({
            where: { userId: token.id as string },
            data: {
              access_token: null,
              refresh_token: null,
              id_token: null
            }
          }),
          // Force expire all sessions
          prisma.session.updateMany({
            where: { userId: token.id as string },
            data: { expires: new Date(0) }
          })
        ]);
      }
    },
    async session({ session, token }) {
      // Verify session hasn't expired
      if (token.exp && Date.now() >= Number(token.exp) * 1000) {
        await prisma.session.deleteMany({
          where: {
            userId: token.id as string
          }
        });
      }
    }
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.myinvoices.today' : undefined,
        maxAge: 24 * 60 * 60 // 24 hours
      }
    },
    callbackUrl: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.callback-url' : 'next-auth.callback-url',
      options: {
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        domain: process.env.NODE_ENV === 'production' ? '.myinvoices.today' : undefined
      }
    },
    csrfToken: {
      name: process.env.NODE_ENV === 'production' ? '__Host-next-auth.csrf-token' : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};
