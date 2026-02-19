import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookieName, verifySession } from "../../../../lib/admin/auth";

export async function GET() {
  const store = await cookies();
  const token = store.get(getCookieName())?.value;
  const sess = verifySession(token);
  if (!sess) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, admin: { u: sess.u } }, { status: 200 });
}
