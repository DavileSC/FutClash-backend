// Interfaz para la posición principal de un jugador
export interface Position {
  id: string;
  shortLabel: string;
  label: string;
}

// Interfaz para los jugadores completos
export interface Players {
  id: number;
  firstName: string;
  lastName: string;
  name: string; // Campo para el nombre completo
  shieldUrl: string;
  typeCard: string;
  position: Position; // Un objeto que representa la posición principal
  alternatePositions?: Position[]; // Un array opcional de posiciones alternas
  price: number;
  overallRating: number;
  obtainedDate: string; // Fecha en formato string
}
