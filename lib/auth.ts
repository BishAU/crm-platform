import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Session, User, Account, Profile } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin: boolean;
    }
  }

  interface User {
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin?: boolean;
  }
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Password",
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

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ 
      session, 
      token 
    }: { 
      session: Session; 
      token: JWT; 
    }): Promise<Session> {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isAdmin = token.isAdmin ?? false;
      }
      return session;
    },
    async jwt({ 
      token, 
      user 
    }: { 
      token: JWT;
      user?: User | AdapterUser;
      account?: Account | null;
      profile?: Profile;
    }): Promise<JWT> {
      if (user) {
        token.isAdmin = (user as User).isAdmin;
      }
      return token;
    }
  },
};

export const { auth, signIn, signOut } = NextAuth(authConfig);
