import { JWT } from "next-auth/jwt"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    id?: string
    hasCanvasInfo?: boolean,
  }

  interface User {
    id?: string,
    email?: string,
    hasCanvasInfo?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    email?: string
    hasCanvasInfo?: boolean,
  }
}