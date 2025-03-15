import { NextAuthOptions } from "next-auth";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import { DataSourceOptions } from "typeorm";
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

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.fast_POSTGRES_HOST,
  username: process.env.fast_POSTGRES_USER,
  password: process.env.fast_POSTGRES_PASSWORD,
  database: process.env.fast_POSTGRES_DATABASE,
  synchronize: false,
  entities: []
});

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: TypeORMLegacyAdapter(dataSourceOptions),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Authentication failed.");
          }

          const { email, password } = credentials;

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Authentication failed");
          }

          const user = await response.json();

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
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
