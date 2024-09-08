import "dotenv/config";
import { createLogger, format } from "winston";
import { MongoDB } from "winston-mongodb";
import DailyRotateFile from "winston-daily-rotate-file";
import config from "config";

const logFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transport: DailyRotateFile = new DailyRotateFile({
  filename: `${config.get("logConfig.logFolder")}${config.get(
    "logConfig.logFile"
  )}`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
});

export const logger = createLogger({
  transports: [
    transport,
    new MongoDB({
      db: `${process.env.DB_CONNECTION_STRING}`,
      collection: "logs",
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: logFormat,
});
