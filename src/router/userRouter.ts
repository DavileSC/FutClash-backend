import { Router } from 'express';
import { userController } from '../controller/userController';
import { authMiddleware } from '../middleware/context';

const userRouter = Router();

// Colocar la ruta de ranking antes de la ruta con parámetros
userRouter.get('/ranking', authMiddleware, userController.usersRankedByTotalPrice);
userRouter.get('/all', authMiddleware, userController.getAllUsers);
userRouter.get('/:id', authMiddleware, userController.getUserById);
userRouter.delete("/delete", authMiddleware, userController.deleteAccount);
userRouter.post("/deactivate", authMiddleware, userController.deactivateAccount);

export default userRouter;
