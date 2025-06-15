import { Session } from "next-auth";

export function isAdmin(session: Session | null | undefined): boolean {
  return session?.user?.role === "admin";
}