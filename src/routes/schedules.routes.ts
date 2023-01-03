import { Router } from "express";

import {
  createScheduleController,
  listSchedulesOfPropertyController,
} from "../controllers/schedules.controller";
import ensureAdmPermissionMiddleware from "../middlewares/ensureAdmPermission.middleware";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureParamsIsValidMiddleware from "../middlewares/ensureParamsIdValid.middleware";
import { SchemaCreateSchedule } from "../schemas/schedule.schemas";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(SchemaCreateSchedule),
  createScheduleController
);

schedulesRoutes.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureAdmPermissionMiddleware,
  listSchedulesOfPropertyController
);

export default schedulesRoutes;
