import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAdmPermissionMiddleware from "../middlewares/ensureAdmPermission.middleware";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureParamsIsValidMiddleware from "../middlewares/ensureParamsIdValid.middleware";
import ensureSomeFieldsWereNotSentMiddleware from "../middlewares/ensureSomeFieldsWereNotSent.middleware";

import ensureUpdatePermissionMiddleware from "../middlewares/ensureUpdatePermission.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";

import {
  SchemaCreateUser,
  SchemaParamsUUID,
  SchemaUpdateUser,
} from "../schemas/users.schemas";

const userRoutes = Router();

userRoutes.patch(
  "/:id",
  ensureParamsIsValidMiddleware(SchemaParamsUUID),
  ensureSomeFieldsWereNotSentMiddleware,
  ensureDataIsValidMiddleware(SchemaUpdateUser),
  ensureAuthMiddleware,
  ensureUpdatePermissionMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureParamsIsValidMiddleware(SchemaParamsUUID),
  ensureAuthMiddleware,
  ensureAdmPermissionMiddleware,
  ensureUserExistsMiddleware,
  deleteUserController
);

userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureAdmPermissionMiddleware,
  listUsersController
);

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(SchemaCreateUser),
  createUserController
);

export default userRoutes;
