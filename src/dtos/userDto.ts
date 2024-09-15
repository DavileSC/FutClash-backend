import mongoose, { Types } from "mongoose";
import { PlayerObtained } from "../interfaces";

interface CreateUserDTO {
  _id?: Types.ObjectId;
  googleId: string;
  name: string;
  email: string;
  avatar: string;
  alias: string;
  deviceType: 'Android' | 'iOS';
  platformGame: 'PlayStation' | 'Xbox' | 'PC' | 'Nintendo';
  playersObtained?: PlayerObtained[];
  friends?: Types.ObjectId[];
  privacyPolicyAccepted: boolean;
  privacyPolicyAcceptedAt: Date;
  termsVersion: string;
}

interface UserProfileDTO {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  alias: string;
  platformGame: string;
  playersObtained: Types.ObjectId[]; // ajusta según la estructura de los jugadores
  deviceType: string;
  friends: Types.ObjectId[]; // ajusta según la estructura de los amigos
}

interface UpdateUserDTO extends PartialCreateUserDTO {
  playersObtained?: PlayerObtained[] | mongoose.Types.DocumentArray<any>;
}

type PartialCreateUserDTO = Partial<CreateUserDTO>;

export { UserProfileDTO, PartialCreateUserDTO, UpdateUserDTO };
