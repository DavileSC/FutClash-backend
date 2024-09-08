import { NextFunction, Response, Request } from "express";
import { Boom } from "@hapi/boom";
import { logger } from "../log/logger";

class ErrorHandler {
  internalError(err: Error, req: Request, res: Response, _next: NextFunction) {
    logger.error(
      `Internal error in ${req.url} with the method ${req.method}. Stack: ${err.stack}`
    );
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }

  boomError(err: Boom, _req: Request, res: Response, next: NextFunction) {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
    } else {
      next(err);
    }
  }
}

const errorHandler = new ErrorHandler();
export { errorHandler };
