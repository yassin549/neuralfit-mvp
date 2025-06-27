import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// By declaring these modules, we can extend the built-in types of NextAuth
declare module 'next-auth' {
  // Extend session to include id and role
  interface Session {
    user: {
      id: string;
      role: string;
    } & NextAuthUser; // Keep original user properties
  }
  // Extend user to include role
  interface User {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  // Extend JWT to include id and role
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  // The adapter type needs to be cast to 'Adapter' from 'next-auth/adapters'
  // to ensure compatibility.
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // The authorize function signature must include 'req'
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Please provide email and password.');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials.');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid credentials.');
        }

        // The object returned must match the 'User' type from next-auth.
        // It must have id, email, name, and image.
        return {
          id: user.id,
          email: user.email as string,
          name: user.name ?? '', // Fallback for null name
          image: user.image ?? null, // Fallback for null image
          role: user.role, // Our custom property
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // The jwt callback is called when a JWT is created or updated.
    // We can add our custom data to the token here.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // The session callback is called when a session is checked.
    // We can add our custom data from the token to the session object here.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login',
  },
};
