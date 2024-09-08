import { Router } from 'express';
import { addPlayerToUser, getAllPlayers } from '../controller/gameController';
import { conditionalAuthMiddleware } from '../middleware/context';

const gameRouter = Router();
// Ruta para obtener todos los jugadores
gameRouter.get('/getAllPlayers', conditionalAuthMiddleware, getAllPlayers);
// Ruta para añadir un jugador a la colección de un usuario
gameRouter.post('/:userId/addPlayer', conditionalAuthMiddleware, addPlayerToUser);

export default gameRouter;
