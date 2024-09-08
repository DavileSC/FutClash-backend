import { Schema } from 'mongoose';

export const playerSchema = new Schema(
  {
    id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    commonName: { type: String, required: true },
    shieldUrl: { type: String, required: true },
    position: {
      id: { type: String, required: true },
      shortLabel: { type: String, required: true },
      label: { type: String, required: true },
    },
    alternatePositions: {
      type: [{
        id: { type: String, required: true },
        shortLabel: { type: String, required: true },
        label: { type: String, required: true },
      }],
      default: undefined, // O un array vacío []
      required: false, // No es obligatorio que tenga posiciones alternas
    },
    overallRating: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);
