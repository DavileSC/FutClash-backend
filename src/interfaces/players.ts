export interface Position {
  id: string;
  shortLabel: string;
  label: string;
}

export interface Players {
  id: number;
  lastName: any;
  firstName: any;
  name: string;  // Un solo campo para el nombre completo
  shieldUrl: string;
  typeCard: string;
  position: Position;  // Un objeto, ya que es la posición principal
  alternatePositions: Position[];  // Un array, ya que contiene las posiciones alternas
  price: number;
  overallRating: number;
  obtainedDate: string;  // Fecha en la que el jugador fue obtenido
}
