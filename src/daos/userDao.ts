// src/dao/userDAO.ts

import { Types } from "mongoose";
import { userEntities } from "../entities/userEntities";
import { User } from "../interfaces";

export const userDAO = {
  findByGoogleId: async (googleId: string) => {
    return await userEntities.findOne({ googleId });
  },

  createUser: async (userData: any) => {
    const newUser = new userEntities(userData);
    return await newUser.save();
  },

  // Obtener todos los usuarios
  getAllUsers: async (): Promise<User[]> => {
    return await userEntities.find(); // Devuelve todos los usuarios en la base de datos
  },

  // Obtener un usuario por id
  getUserById: async (userId: string) => {
    return await userEntities.findById(userId); // Buscar por ObjectId
  },

  updateAlias: async (userId: string, alias: string) => {
    return await userEntities.findByIdAndUpdate(userId, { alias }, { new: true });
  }
};
