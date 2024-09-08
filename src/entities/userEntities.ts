// src/entities/userEntity.ts
import { model } from "mongoose";
import { userSchema } from "../schemas/userSchema";

export const userEntities = model("users", userSchema);
