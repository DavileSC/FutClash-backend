// src/controller/userController.ts
import { Request, Response } from 'express';
import { userService } from '../services/userServices';

export const userController = {

    // Obtener todos los usuarios
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await userService.getAllUsers(); // Llama al servicio para obtener todos los usuarios
            res.json(users); // Devuelve los usuarios como JSON
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    },

    // Obtener un solo usuario por id
    getUserById: async (req: Request, res: Response) => {
        try {
            const userId = req.params.id; // Obtiene el id del usuario de los parámetros
            const user = await userService.getUserById(userId); // Llama al servicio para obtener el usuario
            if (user) {
                res.json(user); // Devuelve el usuario si se encuentra
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },

    // Actualizar el alias de un usuario
    updateAlias: async (req: Request, res: Response) => {
        try {
            const { userId, alias } = req.body; // Asumimos que el userId y alias vienen en el body
            const updatedUser = await userService.updateAlias(userId, alias);
            res.json({ message: "Alias updated successfully!", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error updating alias', error });
        }
    }
};
