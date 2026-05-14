import { dbConnect } from "../db/mongoose";
import { TripGalleryImage } from "../../models/TripGalleryImage";

export type PublicTripGalleryImage = {
  id: string;
  tripSlug: string;
  fileName: string;
  contentType: string;
  size: number;
  src: string;
  createdAt: string;
};

export function tripGalleryImagePath(id: string) {
  return `/api/trips/gallery/${encodeURIComponent(id)}`;
}

export async function getTripGalleryImages(tripSlug: string): Promise<PublicTripGalleryImage[]> {
  await dbConnect();
  const docs = await TripGalleryImage.find({ tripSlug })
    .select({ tripSlug: 1, fileName: 1, contentType: 1, size: 1, createdAt: 1 })
    .sort({ sortOrder: 1, createdAt: 1 })
    .lean();

  return docs.map((doc) => {
    const id = String(doc._id);
    return {
      id,
      tripSlug: String(doc.tripSlug),
      fileName: String(doc.fileName),
      contentType: String(doc.contentType),
      size: Number(doc.size),
      src: tripGalleryImagePath(id),
      createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : new Date(doc.createdAt).toISOString(),
    };
  });
}
