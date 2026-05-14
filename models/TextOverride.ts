import mongoose, { Schema, type Model } from "mongoose";

export type TextOverrideDoc = {
  path: string;
  textKey: string;
  originalText: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
};

const TextOverrideSchema = new Schema<TextOverrideDoc>(
  {
    path: { type: String, required: true, trim: true, index: true },
    textKey: { type: String, required: true, trim: true },
    originalText: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

TextOverrideSchema.index({ path: 1, textKey: 1 }, { unique: true });

export const TextOverride: Model<TextOverrideDoc> =
  (mongoose.models.TextOverride as Model<TextOverrideDoc>) ||
  mongoose.model<TextOverrideDoc>("TextOverride", TextOverrideSchema);
