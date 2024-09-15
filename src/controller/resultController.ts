import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { userService } from "../services/userServices";

import { PartialCreateUserDTO, UserProfileDTO } from "../dtos/userDto";

export class ResultController {
    static async login(req: Request, res: Response) {
        const { email } = req.body;
        try {
            // Verificar si el usuario ya existe
            const user = await userService.getUserByEmail(email);
            if (user) {
                return sendLoginResponse(res, user, "Login successful");
            }

            // Crear nuevo usuario si no existe
            const userData: PartialCreateUserDTO = {
                googleId: req.body.id,
                name: req.body.displayName,
                email: req.body.emails[0].value,
                avatar: req.body.photos ? req.body.photos[0].value : '',
                alias: req.body.alias,
                platformGame: req.body.platform,
                playersObtained: [],
                deviceType: req.body.deviceType,
                friends: [],
                privacyPolicyAccepted: false,
                privacyPolicyAcceptedAt: new Date(),
                termsVersion: '1.0.0'
            };

            const newUser = await userService.createUser(userData as PartialCreateUserDTO);
            if (!newUser || !newUser._id) {
                return res.status(500).send("Error creating user");
            }

            // Enviar respuesta con nuevo usuario
            return sendLoginResponse(res, newUser, "Login successful");

        } catch (error: any) {
            return res.status(500).send(error.message);
        }
    }
}

// Función para transformar un usuario en un DTO sin los campos sensibles
const createUserProfileDTO = (user: any): UserProfileDTO => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        alias: user.alias,
        platformGame: user.platformGame,
        playersObtained: user.playersObtained,
        deviceType: user.deviceType,
        friends: user.friends
    };
};

// Función para manejar la respuesta del login con token y usuario
const sendLoginResponse = (res: Response, user: any, message: string) => {
    const token = generateToken(user._id);
    const userProfileDTO = createUserProfileDTO(user);
    return res.status(200).send({ token, user: userProfileDTO, message });
};
