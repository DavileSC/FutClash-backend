import { Types } from "mongoose";
import { userEntities } from "../entities/userEntities";
import { PartialCreateUserDTO, UpdateUserDTO, UserProfileDTO } from "../dtos/userDto";
import { User } from "../interfaces";

export const userDAO = {

  createUser: async (userData: PartialCreateUserDTO) => {
    const newUser = new userEntities(userData);
    return await newUser.save();
  },

  findByGoogleId: async (googleId: string) => {
    return await userEntities.findOne({ googleId });
  },

  // Actualiza un usuario 
  updateUser: async (user: UpdateUserDTO) => {
    return await userEntities.findByIdAndUpdate(user._id, user, { new: true }).lean();
  },

  // Obtener todos los usuarios
  getAllUsers: async (): Promise<User[]> => {
    return await userEntities.find(); // Devuelve todos los usuarios en la base de datos
  },

  // Obtener un usuario por id
  getUserById: async (userId: string) => {
    return await userEntities.findById(userId); // Buscar por ObjectId
  },

  getUserByEmail: async (email: string) => {
    return await userEntities.findOne({ email });
  },

  updateAlias: async (userId: string, alias: string) => {
    return await userEntities.findByIdAndUpdate(userId, { alias }, { new: true });
  },

  getUsersRankedByTotalPrice: async () => {
    return await userEntities.aggregate([
      {
        $project: {
          name: 1,
          totalValue: {
            $cond: {
              if: { $gt: [{ $size: "$playersObtained" }, 0] }, // Si tienen jugadores obtenidos
              then: { $sum: "$playersObtained.price" },         // Suma los precios de los jugadores obtenidos
              else: 0                                           // Si no tienen jugadores, el total es 0
            }
          }
        }
      },
      { $sort: { totalValue: -1 } } // Ordenar de mayor a menor
    ]);
  },

  // Eliminar un usuario por id
  deleteUserById: async (userId: string) => {
    return await userEntities.findByIdAndDelete(userId); // Elimina un usuario por su id
  },

  // Desactivar un usuario (estableciendo un campo "activo" en falso)
  deactivateUserById: async (userId: string) => {
    return await userEntities.findByIdAndUpdate(
      userId,
      { isActive: false }, // Cambiar estado a "inactivo"
      { new: true }
    );
  }
};
