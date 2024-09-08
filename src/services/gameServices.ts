import { gameDAO } from '../daos/gameDao';
import { userDAO } from '../daos/userDao';
import { badRequest } from '@hapi/boom';
import { PlayerDTO } from '../dtos/playersDTO';
import { formatDate } from '../utils/formsDate';

export const gameService = {
  
  // Obtener todos los jugadores
  getAllPlayers: async () => {
    const players = await gameDAO.getAllPlayers();
    if (!players || players.length === 0) {
      throw badRequest('Jugadores no encontrados');
    }
    return players;
  },

  // Añadir un jugador a la subcolección de un usuario
  addPlayerToUser: async (userId: string, playerData: PlayerDTO) => {
    // Verificar si el usuario existe
    const user = await userDAO.getUserById(userId);
    if (!user) {
      throw badRequest('Usuario no encontrado');
    }

    // Verificar si el jugador existe en la tabla players
    const player = await gameDAO.findPlayerById(playerData.id);
    
    if (!player) {
      throw badRequest('Jugador no encontrado');
    }
    const obtainedDate = formatDate(new Date());
    console.log(obtainedDate);
    
    // Construir el objeto del jugador en el formato deseado
    const playerObtained = {
      id: player.id.toString(),
      name: `${player.firstName} ${player.lastName}`,  // Concatenar firstName y lastName
      shieldUrl: player.shieldUrl,
      typeCard: playerData.typeCard,  
      position: player.position.shortLabel,  
      alternatePositions: player.alternatePositions.map((altPos) => ({
        id: altPos.id,
        shortLabel: altPos.shortLabel,
        label: altPos.label
      })),  // Dejar como array de objetos
      overallRating: player.overallRating.toString(),  
      price: playerData.price,  
      obtainedDate: obtainedDate, 
    };

    // Añadir el jugador a la subcolección playersObtained del usuario
    user.playersObtained.push(playerObtained);

    // Guardar los cambios en el usuario
    await gameDAO.saveUser(user);

    return user;
  }
};
