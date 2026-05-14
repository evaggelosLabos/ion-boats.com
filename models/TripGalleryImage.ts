import mongoose, { Schema, type Model } from "mongoose";

export type TripGalleryImageDoc = {
  tripSlug: string;
  fileName: string;
  contentType: string;
  size: number;
  data: Buffer;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const TripGalleryImageSchema = new Schema<TripGalleryImageDoc>(
  {
    tripSlug: { type: String, required: true, index: true, trim: true },
    fileName: { type: String, required: true, trim: true },
    contentType: { type: String, required: true, trim: true },
    size: { type: Number, required: true, min: 1 },
    data: { type: Buffer, required: true },
    sortOrder: { type: Number, required: true, default: 0, index: true },
  },
  { timestamps: true }
);

TripGalleryImageSchema.index({ tripSlug: 1, sortOrder: 1, createdAt: 1 });

export const TripGalleryImage: Model<TripGalleryImageDoc> =
  (mongoose.models.TripGalleryImage as Model<TripGalleryImageDoc>) ||
  mongoose.model<TripGalleryImageDoc>("TripGalleryImage", TripGalleryImageSchema);
