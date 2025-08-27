import mongoose, { Schema, Document } from "mongoose";

export interface IMediaItem extends Document {
  name: string;
  description: string;
  images: { url: string; publicId: string }[];
  video?: { url: string; publicId: string };
  createdAt: Date;
  updatedAt: Date;
}

const MediaItemSchema = new Schema<IMediaItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    video: {
      url: { type: String },
      publicId: { type: String },
    },
  },
  { timestamps: true }
);

export const MediaItem =
  mongoose.models.MediaItem ||
  mongoose.model<IMediaItem>("MediaItem", MediaItemSchema);
