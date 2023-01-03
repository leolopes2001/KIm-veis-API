import { Request, Response } from "express";
import createCategoryService from "../services/category/createCategory.service";
import { ICategoryRequest } from "../interfaces/categories";
import listCategoriesService from "../services/category/listCategories.service";
import Categories from "../entities/categories.entity";
import { IPropertyResponse } from "../interfaces/properties";
import listPropertiesByCategoryService from "../services/category/listPropertiesByCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  const categoryRequest: ICategoryRequest = req.body;
  const category = await createCategoryService(categoryRequest);

  return res.status(201).json(category);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories: Categories[] = await listCategoriesService();
  return res.json(categories);
};

const listPropertiesByCategoryController = async (
  req: Request,
  res: Response
) => {
  const categoryId = req.params.id
  const properties: any = await listPropertiesByCategoryService(categoryId);
  return res.json(properties);
};

export {
  createCategoryController,
  listCategoriesController,
  listPropertiesByCategoryController,
};
