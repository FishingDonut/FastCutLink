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
  type: "postgres", // Verifique se é "mysql" ou "postgres"
  host: process.env.POSTGRES_HOST, // Corrija os nomes das variáveis de ambiente
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false, // Desativa a sincronização automática
  entities: [], // Adicione suas entidades aqui, se necessário
};

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
