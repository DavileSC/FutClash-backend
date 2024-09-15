import { userDAO } from "../daos/userDao";
import { PartialCreateUserDTO } from "../dtos/userDto";
import { User } from "../interfaces";

// Objeto userService con todas las funciones exportadas
export const userService = {
  // Crear un nuevo usuario
  async createUser(userProfile: PartialCreateUserDTO) {
    return await userDAO.createUser(userProfile);
  },

  // Obtener un usuario por email
  async getUserByEmail(email: string) {
    return await userDAO.getUserByEmail(email);
  },

  // Obtener todos los usuarios
  async getAllUsers() {
    return await userDAO.getAllUsers();
  },

  // Obtener un usuario por id
  async getUserById(userId: string) {
    return await userDAO.getUserById(userId);
  },

  // Actualizar el alias de un usuario
  async updateAlias(userId: string, alias: string) {
    return await userDAO.updateAlias(userId, alias);
  },

  // Obtener usuarios ordenados por el precio total de los jugadores obtenidos
  async getUsersRankedByTotalPrice() {
    return await userDAO.getUsersRankedByTotalPrice();
  },

  // Eliminar una cuenta de usuario
  async deleteUserById(userId: string) {
    return await userDAO.deleteUserById(userId);
  },

  // Desactivar una cuenta de usuario
  async deactivateUserById(userId: string) {
    return await userDAO.deactivateUserById(userId);
  },
};
