import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Extender los tipos de NextAuth para incluir username
declare module "next-auth" {
  interface User {
    id: string;
    username?: string;
  }
  
  interface Session {
    user: {
      id: string;
      username?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email/Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Verificar que credentials no sea undefined y que contenga email y password
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        // Buscar usuario por email o username
        const user = await prisma.appUser.findFirst({
          where: {
            OR: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          },
        });

        if (!user || !user.password_hash) {
          return null;
        }

        // Verificar contraseña
        // Asegurarnos de que los parámetros sean strings explícitamente
        const password = String(credentials.password);
        const hash = String(user.password_hash);
        
        const passwordMatch = await bcrypt.compare(password, hash);

        if (!passwordMatch) {
          return null;
        }

        // Retornar el usuario sin la contraseña
        return {
          id: user.id,
          name: user.name || user.username,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.username = user.username as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string | undefined;
      }
      return session;
    },
  },
});
