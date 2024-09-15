import express from "express";
import { ResultController } from "../controller/resultController";

const resultRouter = express.Router();

resultRouter.post("/", ResultController.login);

export default resultRouter;
