// src/entities/refreshTokenEntity.ts
import { model } from "mongoose";
import { refreshTokenSchema } from "../schemas/refreshTokenSchema";

export const refreshTokenEntity = model("refreshTokens", refreshTokenSchema);

