import { NextResponse } from "next/server";
import { clearAgentSessionCookie } from  "../../../../lib/agent/auth"

export async function POST() {
  await clearAgentSessionCookie();
  return NextResponse.json({ ok: true }, { status: 200 });
}
