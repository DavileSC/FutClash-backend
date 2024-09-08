import { Schema } from 'mongoose';

export const playerSchema = new Schema(
  {
    id: { type: Number, required: true },  
    firstName: { type: String, required: true },  
    lastName: { type: String, required: true },
    shieldUrl: { type: String, required: true },
    position: {
      id: { type: String, required: true },
      shortLabel: { type: String, required: true },
      label: { type: String, required: true },
    },
    alternatePositions: [
      {
        id: { type: String, required: true },
        shortLabel: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    overallRating: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default playerSchema;
