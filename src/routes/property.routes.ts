import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controller";
import ensureAdmPermission from "../middlewares/ensureAdmPermission.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { SchemaProperty } from "../schemas/property.schemas";

const propertyRoutes = Router();

propertyRoutes.post(
  "",
  ensureDataIsValidMiddleware(SchemaProperty),
  ensureAuthMiddleware,
  ensureAdmPermission,
  createPropertyController
);

propertyRoutes.get("", listPropertiesController);

export default propertyRoutes;

// userRoutes.patch(
//     "/:id",
//     ensureParamsIsValidMiddleware(SchemaParamsUUID),
//     ensureSomeFieldsWereNotSentMiddleware,
//     ensureDataIsValidMiddleware(SchemaUpdateUser),
//     ensureAuthMiddleware,
//     ensureUpdatePermissionMiddleware,
//     updateUserController
//   );
