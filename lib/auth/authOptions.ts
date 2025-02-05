import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }

  interface User {
    id: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/find`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {id: credentials?.email}
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Authentication failed");
          }

          const user = await response.json();

          if (user.password !== credentials?.password || !user) {
            throw new Error("Authentication failed");
          }

          return user;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.fullName = user.fullName;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.fullName = token.fullName;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
