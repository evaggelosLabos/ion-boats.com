import { NextResponse } from "next/server";
import { getAgentFromRequest } from "../../../../lib/agent/auth"

export async function GET() {
  const agent = await getAgentFromRequest();
  if (!agent) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ agent }, { status: 200 });
}
