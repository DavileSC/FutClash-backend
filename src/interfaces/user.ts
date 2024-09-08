import { Types } from "mongoose";
import { AlternatePositions } from "./alternatePositions";

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
  _id?: Types.ObjectId; // Hacemos que sea opcional con "?" porque aún no se genera cuando creamos el usuario
  googleId?: string | null;
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
