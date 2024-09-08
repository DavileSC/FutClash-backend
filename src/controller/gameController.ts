import { Request, Response, NextFunction } from 'express';
import { gameService } from '../services/gameServices';

// Obtener todos los jugadores
export const getAllPlayers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const players = await gameService.getAllPlayers();
    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
};

// Añadir un jugador a la colección de un usuario
export const addPlayerToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const playerData = req.body; // Recibir los datos del jugador desde el frontend
    const tokenUserId = req.body.user_id; // user_id obtenido del token verificado por el middleware

    // Puedes añadir una validación adicional aquí si deseas verificar que el userId de la URL coincide con el token
    if (userId !== tokenUserId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    
    const updatedUser = await gameService.addPlayerToUser(userId, playerData);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Controlador para buscar jugadores por nombre
export const searchPlayers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body; // Obtener el término de búsqueda desde el body

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing name parameter' });
    }

    // Llamar al servicio para buscar jugadores por nombre
    const players = await gameService.searchPlayersByName(name);

    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
};
