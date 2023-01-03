import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { SchemaCreateSession } from "../schemas/session.schemas";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  ensureDataIsValidMiddleware(SchemaCreateSession),
  createSessionController
);

export default sessionRoutes;
