import { Router } from 'express';
import { userController } from '../controller/userController';
import { conditionalAuthMiddleware } from '../middleware/context';

const userRouter = Router();

userRouter.get('/all', conditionalAuthMiddleware, userController.getAllUsers); // Requiere autenticación
userRouter.get('/:id', conditionalAuthMiddleware, userController.getUserById); // Requiere autenticación

export default userRouter;
