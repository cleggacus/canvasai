import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";

import { prisma } from "./prisma";
import { loginSchema } from "../utils/validation/auth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        const creds = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        const hasCanvasInfo = 
          user.canvasToken != null && user.canvasUrl != null;

        return {
          id: user.id,
          email: user.email,
          hasCanvasInfo
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
        token.hasCanvasInfo = user.hasCanvasInfo;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.hasCanvasInfo = token.hasCanvasInfo;
      }

      return session;
    },
  },
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60,
  },
  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
};