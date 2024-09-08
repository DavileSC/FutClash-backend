import { playersEntities } from "../entities/playersEntities";
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

  // Buscar jugadores por nombre utilizando `$regex` en firstName, lastName y commonName
  findPlayersByName: async (regex: RegExp) => {
    return await playersEntities.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { commonName: { $regex: regex } }
      ]
    }).select('firstName lastName commonName position overallRating'); // Ajusta los campos según tus necesidades
  },

};


