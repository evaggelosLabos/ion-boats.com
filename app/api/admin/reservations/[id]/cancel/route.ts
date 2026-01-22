import { NextResponse } from "next/server";
import { dbConnect } from "../../../../../../lib/db/mongoose";
import { Reservation } from "../../../../../../models/Reservation";

export async function POST(_: Request, ctx: { params: { id: string } }) {
  await dbConnect();

  const id = ctx.params.id;
  const r = await Reservation.findById(id);
  if (!r) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  if (r.status !== "cancelled") {
    r.status = "cancelled";
    await r.save();
  }

  return NextResponse.json({ ok: true });
}
