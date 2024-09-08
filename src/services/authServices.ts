// src/services/authService.ts
import { userDAO } from '../daos/userDao';
import { CreateUserDTO } from '../dtos/userDTO';
import { User } from '../interfaces';

export const authService = {
  handleGoogleLogin: async (userProfile: any): Promise<User> => { // Cambiado a User en lugar de CreateUserDTO
    try {
      // Buscar al usuario en la base de datos por GoogleId
      let user = await userDAO.findByGoogleId(userProfile.id);

      if (!user) {
        // Crear al usuario sin alias y sin playersObtained
        const userData: CreateUserDTO = {
          googleId: userProfile.id || "", // Asegúrate de que no sea null
          name: userProfile.displayName,
          email: userProfile.emails[0].value,
          avatar: userProfile.photos[0].value, // Avatar de Google
          alias: "Juanito", // Alias vacío en esta etapa
          playersObtained: [] // Inicialmente vacío
        };

        // Crear el usuario en la base de datos
        user = await userDAO.createUser(userData);
      }

      // Devolver el documento completo del usuario (con _id)
      return user;
    } catch (error) {
      console.error('Error during Google login:', error);
      throw new Error('Error during Google login');
    }
  }
};
