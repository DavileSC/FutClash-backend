import { gameDAO } from '../daos/gameDao';
import { userDAO } from '../daos/userDao';
import { badRequest } from '@hapi/boom';
import { formatDate } from '../utils/formsDate';
import { PlayerObtained } from '../interfaces';
import { Players } from '../interfaces/players';

export const gameService = {

  // Obtener todos los jugadores
  getAllPlayers: async () => {
    const players = await gameDAO.getAllPlayers();
    if (!players || players.length === 0) {
      throw badRequest('Jugadores no encontrados');
    }
    return players;
  },

  // Buscar jugadores por nombre utilizando una expresión regular
  searchPlayersByName: async (name: string) => {
    const regex = new RegExp(name, 'i'); // Insensible a mayúsculas/minúsculas
    const players = await gameDAO.findPlayersByName(regex);
    if (!players || players.length === 0) {
      throw badRequest('Jugadores no encontrados');
    }
    return players; // Devuelve una lista de jugadores encontrados
  },

  // Añadir un jugador a la subcolección de un usuario
  addPlayerToUser: async (userId: string, playerData: Players) => {
    console.log("userId" + userId, "playerId" + playerData);

    // Verificar si el usuario existe
    const user = await userDAO.getUserById(userId); // Devuelve un objeto plano
    if (!user) {
      throw badRequest('Usuario no encontrado');
    }

    // Verificar si el jugador existe por ID
    const player = await gameDAO.findPlayerById(playerData.id); // Buscar por ID
    if (!player) {
      throw badRequest('Jugador no encontrado');
    }

    const obtainedDate = formatDate(new Date());

    // Construir el objeto del jugador en el formato deseado
    const playerObtained: PlayerObtained = {
      id: player.id,
      name: `${player.firstName} ${player.lastName}`,
      shieldUrl: player.shieldUrl,
      typeCard: playerData.typeCard, // Ajustar si es necesario
      position: player.position.shortLabel,
      overallRating: player.overallRating,
      price: playerData.price, // Ajustar si es necesario
      obtainedDate: obtainedDate,
      alternatePositions: player.alternatePositions !== null && player.alternatePositions !== undefined
        ? player.alternatePositions.map((altPos: any) => ({
            id: altPos.id,
            shortLabel: altPos.shortLabel,
            label: altPos.label,
          }))
        : null,
    };

    // Añadir el jugador a la subcolección playersObtained del usuario
    user.playersObtained.push(playerObtained);

    // Guardar los cambios en el usuario
    await userDAO.updateUser(user);

    return user;
  },
};
