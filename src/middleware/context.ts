// Middleware de verificación de tokens (sin cookies)
import { NextFunction, Response, Request } from "express";
import { TOKEN_EXPIRED, UNAUTHORIZED } from "../const/sessionError"; // Constantes que has definido
import { JwtPayload } from "jsonwebtoken";
import { logger } from "../log/logger";
import { verifyToken } from "../utils/jwt";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.header('Authorization');

    // Verificar si la cabecera 'Authorization' está presente
    if (!authorizationHeader) {
        logger.warn("Authorization header missing");
        return res.status(401).json({ error: UNAUTHORIZED }); // Usar constante UNAUTHORIZED
    }

    // Verificar si el formato de la cabecera es correcto (debería ser "Bearer TOKEN")
    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        logger.warn("Invalid Authorization format");
        return res.status(401).json({ error: UNAUTHORIZED }); // Usar constante UNAUTHORIZED
    }

    try {
        // Verificar y decodificar el token
        const tokenData = await verifyToken(token) as JwtPayload;
        req.body.userId = tokenData.id; // Extraer el userId desde el token y colocarlo en req.body
        next(); // Continúa si el token es válido
    } catch (e) {
        logger.error("Token verification failed", e);
        return res.status(401).json({ error: TOKEN_EXPIRED }); // Usar constante TOKEN_EXPIRED
    }
}

export { authMiddleware };
