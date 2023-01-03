import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const ensureDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validatedBody;

      return next();
    } catch (err) {
      return res.status(400).json({ message: err.errors });
    }
  };
  
export default ensureDataIsValidMiddleware;
