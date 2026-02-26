
import { cookies } from "next/headers";
import { getCookieName, verifySession } from "./auth";

export async function requireAdmin() {
  const cookieStore = await cookies(); // ✅ cookies() is async in your setup
  const token = cookieStore.get(getCookieName())?.value;
  const session = verifySession(token);

  if (!session) {
    const err = new Error("Unauthorized");
    // @ts-ignore
    err.status = 401;
    throw err;
  }

  return session;
}