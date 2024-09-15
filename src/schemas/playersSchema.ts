import { Schema } from 'mongoose';

export const playerSchema = new Schema(
  {
    _id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    commonName: { type: String, required: true },
    position: { type: Array, required: true },
    overallRating: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);
