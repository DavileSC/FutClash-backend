import { Router } from 'express';
import { userController } from '../controller/userController';
import { authMiddleware } from '../middleware/context';

const userRouter = Router();

// Colocar la ruta de ranking antes de la ruta con parámetros
userRouter.get('/ranking', authMiddleware, userController.usersRankedByTotalPrice); // Requiere autenticación
userRouter.get('/all', authMiddleware, userController.getAllUsers); // Requiere autenticación
userRouter.get('/:id', authMiddleware, userController.getUserById); // Requiere autenticación

export default userRouter;
