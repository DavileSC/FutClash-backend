import { Request, Response, NextFunction } from 'express';
import { gameService } from '../services/gameServices';

export const getAllPlayers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const players = await gameService.getAllPlayers();
    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
};

export const addPlayerToUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const playerData = req.body; // Aquí recibiremos los datos del jugador desde el frontend    

    const updatedUser = await gameService.addPlayerToUser(userId, playerData);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
