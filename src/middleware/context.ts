// Middleware de verificación de tokens (sin cookies)
import { NextFunction, Response, Request } from "express";
import { TOKEN_EXPIRED, UNAUTHORIZED } from "../const/sessionError";
import { JwtPayload } from "jsonwebtoken";
import { logger } from "../log/logger";
import { verifyToken } from "../utils/jwt";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.header('Authorization');

    // Verificar si la cabecera 'Authorization' está presente
    if (!authorizationHeader) {
        logger.warn("Authorization header missing");
        return res.status(401).json({ error: 'Missing Authorization header' });
    }

    // Verificar si el formato de la cabecera es correcto (debería ser "Bearer TOKEN")
    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        logger.warn("Invalid Authorization format");
        return res.status(401).json({ error: 'Invalid Authorization format. Expected "Bearer TOKEN"' });
    }

    try {
        // Verificar y decodificar el token
        const tokenData = await verifyToken(token) as JwtPayload;
        req.body.user_id = tokenData.id;
        next(); // Continúa si el token es válido
    } catch (e) {
        logger.error("Token verification failed", e);
        return res.status(401).json({ error: 'Token expired or invalid' }); // Error claro de token expirado o inválido
    }
}


export { authMiddleware };
