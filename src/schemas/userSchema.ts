import { Schema, Types } from "mongoose";
import { emailRules } from "../const/emailRegularExpression";

const playerObtainedSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    typeCard: { type: String, required: true },
    position: { type: Array, required: true }, // Posición principal como cadena
    overallRating: { type: Number, required: true },
    price: { type: Number, required: true, min: 1, max: 15000000 },
    obtainedDate: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true
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
    deviceType: {
      type: String,
      enum: ['Android', 'iOS'],
      required: true,
    },
    platformGame: {
      type: String,
      enum: ['PlayStation', 'Xbox', 'PC', 'Nintendo'],
      required: true,
    },
    friends: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Referencia a otros usuarios
      default: [], // Por defecto, un array vacío
    },
    privacyPolicyAccepted: {
      type: Boolean,
      default: false,
      required: true
    },
    privacyPolicyAcceptedAt: {
      type: Date,
      required: true
    },
    termsVersion: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export { userSchema, playerObtainedSchema };
