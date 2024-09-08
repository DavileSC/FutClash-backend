// src/dtos/PlayerDTO.ts
export interface PlayerDTO {
    id: number;
    firstName: string;
    lastName: string;
    typeCard: string;
    position: {
      id: string;
      shortLabel: string;
      label: string;
    };  // Un objeto para la posición principal
    alternatePositions: {
      id: string;
      shortLabel: string;
      label: string;
    }[];  // Array de posiciones alternas
    price: number;
    overallRating: number;  // Valor del overallRating
    obtainedDate: string;  // Fecha en la que el jugador fue obtenido
  }
  