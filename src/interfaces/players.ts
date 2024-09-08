import { AlternatePositions } from "./alternatePositions";

// Interfaz para los jugadores completos
export interface Players {
  id: number;
  firstName: string;
  lastName: string;
  commonName: string;
  name: string; // Campo para el nombre completo
  shieldUrl: string;
  typeCard: string;
  position: AlternatePositions; // Un objeto que representa la posición principal
  alternatePositions?: AlternatePositions[]; // Un array opcional de posiciones alternas
  price: number;
  overallRating: number;
  obtainedDate: string; // Fecha en formato string
}
