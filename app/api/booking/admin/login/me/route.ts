import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCookieName, verifySession } from "../../../../../../lib/admin/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;

  const session = verifySession(token);
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  return NextResponse.json({ ok: true, user: { username: session.u } });
}

