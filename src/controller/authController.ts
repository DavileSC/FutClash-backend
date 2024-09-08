// src/controller/authController.ts
import { Request, Response } from 'express';
import { authService } from '../services/authServices';
import { generateToken } from '../utils/jwt';

export const authController = {
  googleAndroidCallback: async (req: Request, res: Response) => {
    try {
      const userProfile = req.body;

      // Verificar o crear el usuario
      const user = await authService.handleGoogleLogin(userProfile);

      // Verificar que _id no sea undefined
      if (!user._id) {
        throw new Error("User ID is missing after Google login.");
      }

      // Generar JWT para el usuario autenticado
      const token = generateToken(user._id); // Ahora _id está garantizado

      // Devolver el token al cliente
      res.json({ token, message: "Login successful!" });

    } catch (error) {
      console.error("Error during Google login:", error);
      res.status(500).json({ message: 'Error during Android login', error });
    }
  },

  googleIosCallback: async (req: Request, res: Response) => {
    try {
      const userProfile = req.body;
      const user = await authService.handleGoogleLogin(userProfile);

      // Verificar que _id no sea undefined
      if (!user._id) {
        throw new Error("User ID is missing after Google login.");
      }

      const token = generateToken(user._id);
      res.json({ token, message: "Login successful!" });
    } catch (error) {
      console.error("Error during Google login:", error);
      res.status(500).json({ message: 'Error during iOS login', error });
    }
  }
};
