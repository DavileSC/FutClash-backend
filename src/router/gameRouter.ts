import { Router } from 'express';
import { addPlayerToUser, getAllPlayers, searchPlayers } from '../controller/gameController';
import { authMiddleware } from '../middleware/context';

const gameRouter = Router();
// Ruta para obtener todos los jugadores
gameRouter.get('/getAllPlayers', authMiddleware, getAllPlayers);

// Ruta para obtener a un jugador de la colección de un players
gameRouter.post('/searchPlayers', authMiddleware, searchPlayers);

// Ruta para añadir un jugador a la colección de un usuario
gameRouter.post('/:userId/addPlayer', authMiddleware, addPlayerToUser);

export default gameRouter;
