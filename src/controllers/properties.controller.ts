import { Response, Request } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/property/createProperty.service";
import listPropertiesService from "../services/property/listProperties.service";
import listSchedulesOfPropertyService from "../services/schedule/listSchedulesOfProperty.service";

const createPropertyController = async (req: Request, res: Response) => {
  const propertyRequest: IPropertyRequest = req.body;
  const property = await createPropertyService(propertyRequest);
  return res.status(201).json(property);
};

const listPropertiesController = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();
  return res.json(properties);
};

export { createPropertyController, listPropertiesController };
