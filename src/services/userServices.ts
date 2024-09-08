// src/services/userService.ts

import { Types } from "mongoose";
import { userDAO } from "../daos/userDao";

export const userService = {

  // Obtener todos los usuarios
  getAllUsers: async () => {
    return await userDAO.getAllUsers(); // Llama al DAO para obtener todos los usuarios
  },

  // Obtener un usuario por id
  getUserById: async (userId: string) => {
    return await userDAO.getUserById(userId); // Llama al DAO para obtener un usuario por su id
  },
  updateAlias: async (userId: string, alias: string) => {
    return await userDAO.updateAlias(userId, alias);
  },

  getUsersRankedByTotalPrice: async () => {
    const usersRankedByTotalPrice = await userDAO.getUsersRankedByTotalPrice();
    return usersRankedByTotalPrice;
  }
};
