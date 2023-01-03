import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listPropertiesByCategoryController,
} from "../controllers/categories.controller";
import ensureAdmPermissionMiddleware from "../middlewares/ensureAdmPermission.middleware";


import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { SchmaeCreateCategory } from "../schemas/category.schemas";

const categoryRoutes = Router();

categoryRoutes.get("/:id/properties", listPropertiesByCategoryController);

categoryRoutes.get("", listCategoriesController);

categoryRoutes.post(
  "",
  ensureDataIsValidMiddleware(SchmaeCreateCategory),
  ensureAuthMiddleware,
  ensureAdmPermissionMiddleware,
  createCategoryController
);

export default categoryRoutes;
