import { playersEntities } from "../entities/playersEntities";
import { userEntities } from "../entities/userEntities";
import { User } from "../interfaces";
import { Players } from "../interfaces/players";

export const gameDAO = {

  // Buscar un jugador por ID
  // Si el playerId está en un campo separado y no es el ObjectId:
  findPlayerById: async (id: number): Promise<Players | null> => {
    return await playersEntities.findOne({ id: id });
  },

  // Obtener todos los jugadores
  getAllPlayers: async () => {
    return await playersEntities.find();  // Devuelve todos los jugadores en la colección
  },

  // Guardar un usuario (actualizar)
  saveUser: async (user: User) => {
    return await userEntities.findByIdAndUpdate(user._id, user, { new: true });
  }
};


