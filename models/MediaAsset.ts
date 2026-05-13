import mongoose, { Schema, type Model } from "mongoose";

export type MediaAssetDoc = {
  key: string;
  fileName: string;
  contentType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
};

const MediaAssetSchema = new Schema<MediaAssetDoc>(
  {
    key: { type: String, required: true, unique: true, index: true },
    fileName: { type: String, required: true, trim: true },
    contentType: { type: String, required: true, trim: true },
    size: { type: Number, required: true, min: 1 },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

export const MediaAsset: Model<MediaAssetDoc> =
  (mongoose.models.MediaAsset as Model<MediaAssetDoc>) ||
  mongoose.model<MediaAssetDoc>("MediaAsset", MediaAssetSchema);
