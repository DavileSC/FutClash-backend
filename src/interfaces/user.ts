import { Types } from "mongoose";

// Interfaz para las posiciones alternas
export interface AlternatePositions {
  id: string;
  shortLabel: string;
  label: string;
}

// Interfaz para los jugadores obtenidos
export interface PlayerObtained {
  id: number;
  name: string;
  shieldUrl: string;
  typeCard: string;
  position: string; // La posición principal es un string (shortLabel)
  alternatePositions?: AlternatePositions[] | null; // Un array opcional de posiciones alternas
  overallRating: number;
  price: number;
  obtainedDate: string; // Fecha en formato string
}

// Interfaz del usuario que contiene la lista de jugadores obtenidos
export interface User {
  _id: Types.ObjectId; // Usamos ObjectId de Mongoose
  googleId?: string | null; // Puede ser undefined o null
  name: string;
  email: string;
  avatar: string;
  alias: string;
  playersObtained: PlayerObtained[]; // Un array de jugadores obtenidos
  createdAt?: Date;
  updatedAt?: Date;
}

// Mock data de usuarios (para pruebas)
export const users: { [key: string]: User } = {};
