import { Types } from "mongoose";

// Interfaz para los jugadores obtenidos
export interface PlayerObtained {
  _id?: Types.ObjectId;
  name: string;
  typeCard: string;
  position: []; // La posición principal es un string (shortLabel)
  overallRating: number;
  price: number;
  obtainedDate: string; // Fecha en formato string
}

export interface User {
  _id?: Types.ObjectId; // Obligatorio
  googleId: string;
  name: string;
  email: string;
  avatar: string;
  alias: string;
  playersObtained?: PlayerObtained[]; // Array de jugadores obtenidos
  deviceType: 'Android' | 'iOS'; // Nuevo campo para el tipo de dispositivo
  platformGame: 'PlayStation' | 'Xbox' | 'PC' | 'Nintendo'; // Plataforma del usuario
  friends?: Types.ObjectId[]; // IDs de otros usuarios (amigos)
  privacyPolicyAccepted: boolean;
  privacyPolicyAcceptedAt: Date; 
  termsVersion: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

export const users: { [key: string]: User } = {};
