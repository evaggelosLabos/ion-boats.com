import { NextResponse } from "next/server";
import { getCookieName, signSession, validateCredentials } from "../../../../lib/admin/auth";

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => ({}));

  const username = isObj(body) && typeof body.username === "string" ? body.username.trim() : "";
  const password = isObj(body) && typeof body.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json({ ok: false, error: "Missing username/password" }, { status: 400 });
  }

  const ok = validateCredentials(username, password);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const token = signSession({ u: username, iat: Date.now() });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(getCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 14 * 24 * 60 * 60, // 14 days (seconds)
  });

  return res;
}
