import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../lib/db/mongoose";
import { getCookieName, verifySession } from "../../../../lib/admin/auth";
import { TRIP_PAGES } from "../../../../lib/trips/trips";
import { getTripGalleryImages, tripGalleryImagePath } from "../../../../lib/trips/gallery";
import { TripGalleryImage } from "../../../../models/TripGalleryImage";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  return verifySession(token);
}

function getTrip(slug: string) {
  return TRIP_PAGES.find((trip) => trip.slug === slug) ?? null;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const trips = await Promise.all(
    TRIP_PAGES.map(async (trip) => ({
      slug: trip.slug,
      title: trip.title,
      builtInCount: trip.images?.length ?? 0,
      recommendedRatio: "16:10",
      addedImages: await getTripGalleryImages(trip.slug),
    }))
  );

  return NextResponse.json({ ok: true, trips });
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });

  const tripSlug = String(form.get("tripSlug") ?? "");
  const trip = getTrip(tripSlug);
  if (!trip) return NextResponse.json({ ok: false, error: "Unknown trip" }, { status: 400 });

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Missing image file" }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json({ ok: false, error: "Upload a JPG, PNG, WebP, GIF, or AVIF image." }, { status: 400 });
  }

  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ ok: false, error: "Image must be smaller than 10 MB." }, { status: 400 });
  }

  const data = Buffer.from(await file.arrayBuffer());

  await dbConnect();
  const count = await TripGalleryImage.countDocuments({ tripSlug });
  const image = await TripGalleryImage.create({
    tripSlug,
    fileName: file.name || `${tripSlug}-gallery-image`,
    contentType: file.type,
    size: file.size,
    data,
    sortOrder: count,
  });

  const id = String(image._id);
  return NextResponse.json({ ok: true, id, src: tripGalleryImagePath(id) });
}
