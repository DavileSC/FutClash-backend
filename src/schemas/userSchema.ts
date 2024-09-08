import { Schema } from "mongoose";
import { emailRules } from "../const/emailRegularExpression";

const playerObtainedSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    shieldUrl: { type: String, required: true },
    typeCard: { type: String, required: true },
    position: { type: String, required: true }, // Posición principal como cadena
    alternatePositions: { type: Array, required: true }, // Posiciones alternas como cadena separada por comas
    overallRating: { type: Number, required: true },
    price: { type: Number, required: true },
    obtainedDate: { type: String, required: true }
  },
  { _id: false }
);


const userSchema = new Schema(
    {
      googleId: {
        type: String,
        required: false,
        default: null,
      },
      name: {
        type: String,
        required: true,
        minlength: 3,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        match: emailRules,
      },
      alias: {
        type: String,
        required: true,
        minlength: 3,
      },
      avatar: {
        type: String,
        required: true,
      },
      playersObtained: {
        type: [playerObtainedSchema], // Array de jugadores obtenidos
        default: [], // Por defecto, un array vacío
      },
    },
    { timestamps: true }
  );
export { userSchema, playerObtainedSchema };


