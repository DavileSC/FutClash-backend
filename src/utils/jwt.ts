import "dotenv/config";
import jwt, { sign, verify, JwtPayload } from "jsonwebtoken";
import { logger } from "../log/logger";
import { ObjectId, Types } from "mongoose";
import { refreshTokenEntity } from "../entities/refreshTokenEntities";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_jwt_secret";

// Genera un token de acceso
function generateToken(id: Types.ObjectId) { // Cambiado a Types.ObjectId
  const token = sign({ id }, JWT_SECRET, { expiresIn: "1h" }); // Expira en 15 minutos
  return token;
}

// Genera un token de refresco y lo almacena en la base de datos
async function generateRefreshToken(userId: ObjectId) {
  const token = sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" }); // Expira en 7 días

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Token expira en 7 días

  // Guardar el token de refresco en la base de datos
  await refreshTokenEntity.create({
    token,
    userId,
    expiresAt
  });

  return token;
}

// Verifica y valida un token JWT de acceso
async function verifyToken(jwtToken: string): Promise<string | JwtPayload> {
  try {
    const decoded = await new Promise<string | JwtPayload>((resolve, reject) => {
      jwt.verify(jwtToken, JWT_SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            logger.error('Token has expired');
            reject(new Error('Token has expired'));
          } else {
            logger.error('Invalid token');
            reject(new Error('Invalid token'));
          }
        } else {
          resolve(decoded as string | JwtPayload);
        }
      });
    });
    return decoded;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Verification failed: ${error.message}`);
    } else {
      throw new Error("Unknown error occurred during token verification");
    }
  }
}

// Refresca el token de acceso usando un token de refresco
async function refreshToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayload;
    const storedToken = await refreshTokenEntity.findOne({ token: refreshToken });

    if (!storedToken) {
      throw new Error("Invalid refresh token");
    }

    // Genera un nuevo token de acceso
    const newToken = generateToken(decoded.id as Types.ObjectId);
    return { token: newToken };
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error refreshing token: ${error.message}`);
      throw new Error(`Unable to refresh token: ${error.message}`);
    } else {
      logger.error("Unknown error occurred during token refresh");
      throw new Error("Unable to refresh token due to unknown error");
    }
  }
}

export { generateToken, verifyToken, generateRefreshToken, refreshToken };
