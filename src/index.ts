import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Response } from "express";
import session from "express-session";
import passport from "passport";
import { logger } from "./log/logger";
import { errorHandler } from "./middleware/errorHandler";
import db from "./config/mongo";
import * as dotenv from "dotenv";
import fs from "fs";
import expressWinston from 'express-winston';
import authRouter from './router/authRouter'; // Asegúrate de tener configurado el router de autenticación
import './middleware/passport'; // Importar la configuración de Passport
import userRouter from "./router/userRouter";
import gameRouter from "./router/gameRouter";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "localhost";

// Renombrar la constante local de Winston
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

// Middleware para aplicar CSRF solo a métodos sensibles

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
  credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/game', gameRouter);

// Ejemplo de ruta para verificar que el servidor está en funcionamiento
app.get("/", (res: Response) => {
  res.send('<a href="/auth/google/android">Login with Google</a>');
});

// Manejo de errores
app.use(errorHandler.boomError);
app.use(errorHandler.internalError);

interface LogConfig {
  logFolder: string;
  logFile: string;
}

interface AppConfig {
  logConfig: LogConfig;
}

const jsonConfig: AppConfig = JSON.parse(
  fs.readFileSync("config/default.json", "utf8")
);

jsonConfig.logConfig.logFolder = jsonConfig.logConfig.logFolder.replace(
  "./src",
  process.env.LOG_FOLDER_PATH || ""
);

db().then(() => {
  console.log("Conexion Ready");
});

// Iniciar el servidor
const host = app.listen(PORT, () => {
  console.log(`Now listening on host ${HOST} and port ${PORT}`);
});

export default host;
