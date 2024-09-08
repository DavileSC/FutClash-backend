import { Types } from "mongoose";

export interface alternatePositions {
    id: string;
    shortLabel: string;
    label: string;
  }

export interface playerObtained {
    id: number
    name: string
    shieldUrl: string
    typeCard: string
    position: string
    alternatePositions: alternatePositions[];
    overallRating: number
    price: number
    obtainedDate: String
}
export interface User {
    _id: Types.ObjectId;  // Cambiamos _id a ObjectId
    googleId?: string | null; // Permitir que sea undefined o null
    name: string;
    email: string;
    avatar: string;
    alias: string;
    playersObtained: playerObtained[]; // Lista de jugadores obtenidos
    createdAt?: Date;
    updatedAt?: Date;
}

export const users: { [key: string]: User } = {};