// src/dto/userDTO.ts
import { playerObtained } from "../interfaces";

// src/dto/userDTO.ts

export interface CreateUserDTO {
  googleId?: string | null;
  name: string;
  email: string;
  avatar: string;
  alias?: string;
  playersObtained?: playerObtained[]; // La lista de jugadores obtenidos
}


