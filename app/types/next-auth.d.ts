import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;  // agrega role opcional
    token?: string;
  }

  interface Session {
    user: {
      id: string;
      role?: string;
      token?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    token: string;
    role: string;
    name: string;
  }
}