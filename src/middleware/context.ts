// Middleware de verificación de tokens (sin cookies)
import { NextFunction, Response, Request } from "express";
import { TOKEN_EXPIRED, UNAUTHORIZED } from "../const/sessionError";
import { JwtPayload } from "jsonwebtoken";
import { excludedRoutes } from "../const/excludedRoutes";
import { logger } from "../log/logger";
import { verifyToken } from "../utils/jwt";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
        logger.warn("Missing Authorization header");
        return res.status(401).send(UNAUTHORIZED); // Mejor manejo de error para header faltante
    }

    const token = authorizationHeader.split(' ')[1]; // Espera el token en formato "Bearer TOKEN"

    try {
        const tokenData = await verifyToken(token) as JwtPayload;
        req.body.user_id = tokenData.id;
        next(); // Continua si el token es válido
    } catch (e) {
        logger.error("Error verifying token:", e);
        res.status(401).send(TOKEN_EXPIRED); // Error claro de token expirado o inválido
    }
}

export { authMiddleware };

function conditionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {

    if (req.method === 'GET' && excludedRoutes.some(route => route.test(req.path.toString()))) {
        return next();
    } else if (req.method === 'POST' && excludedRoutes.some(route => route.test(req.path.toString()))) {
        return next();
    }
    return authMiddleware(req, res, next);
}

export { conditionalAuthMiddleware };