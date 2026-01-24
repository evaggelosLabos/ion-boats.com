import { NextResponse } from "next/server";
import { createAgentSessionCookie, verifyAgentCredentials } from "../../../../lib/agent/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "");
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password." }, { status: 400 });
    }

    const agent = await verifyAgentCredentials(email, password);
    if (!agent) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    await createAgentSessionCookie(agent.id);

    return NextResponse.json({ agent }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
