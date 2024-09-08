import { Schema, Types } from "mongoose";

const refreshTokenSchema = new Schema({
    token: { type: String, required: true },
    userId: { type: String, required: true, ref: 'users' },
    expiresAt: { type: Date, required: true } // Fecha de expiración del token
});
export { refreshTokenSchema };


