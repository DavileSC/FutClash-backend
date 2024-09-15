import { Types } from "mongoose";

// Interfaz para los jugadores completos
export interface Players {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  commonName: string;
  name: string; // Campo para el nombre completo
  typeCard: string;
  position: [] // Un objeto que representa la posición principal
  price: number;
  overallRating: number;
  obtainedDate: string; // Fecha en formato string
}
