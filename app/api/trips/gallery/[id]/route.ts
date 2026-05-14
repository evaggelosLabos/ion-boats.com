import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { dbConnect } from "../../../../../lib/db/mongoose";
import { TripGalleryImage } from "../../../../../models/TripGalleryImage";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Unknown gallery image" }, { status: 404 });
  }

  await dbConnect();
  const image = await TripGalleryImage.findById(id);
  if (!image?.data) {
    return NextResponse.json({ error: "Unknown gallery image" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": String(image.size),
      "Cache-Control": "no-store",
    },
  });
}
