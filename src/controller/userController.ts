import { Request, Response } from "express";
import { userService } from "../services/userServices";

export const userController = {
    // Obtener todos los usuarios
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users); // Devolver todos los usuarios en formato UserDTO
        } catch (error) {
            return res.status(500).json({ message: "Error fetching users", error });
        }
    },

    // Obtener un usuario por id
    async getUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await userService.getUserById(userId);
            if (user) {
                return res.json(user);
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error fetching user", error });
        }
    },

    // Actualizar el alias de un usuario
    async updateAlias(req: Request, res: Response) {
        try {
            const { userId, alias } = req.body;
            const updatedUser = await userService.updateAlias(userId, alias);
            return res.json({ message: "Alias updated successfully!", user: updatedUser });
        } catch (error) {
            return res.status(500).json({ message: "Error updating alias", error });
        }
    },

    // Obtener usuarios ordenados por el precio total de los jugadores obtenidos
    async usersRankedByTotalPrice(req: Request, res: Response) {
        try {
            const users = await userService.getUsersRankedByTotalPrice();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching users", error });
        }
    },

    async deleteAccount(req: Request, res: Response) {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(401).send("Unauthorized");
        }
        try {
            const deleted = await userService.deleteUserById(userId);
            if (deleted) {
                return res.status(200).send({ message: "Account deleted successfully" });
            } else {
                return res.status(404).send({ message: "User not found" });
            }
        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    },

    // Desactivar la cuenta
    async deactivateAccount(req: Request, res: Response) {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(401).send("Unauthorized");
        }

        try {
            const deactivated = await userService.deactivateUserById(userId);
            if (deactivated) {
                return res.status(200).send({ message: "Account deactivated successfully" });
            } else {
                return res.status(404).send({ message: "User not found" });
            }
        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    },
};
