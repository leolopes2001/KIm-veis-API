import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const ensureParamsIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({ uuid: req.params.id });

      return next();
    } catch (error) {
      return res.status(404).json({ message: "User not found" });
    }
  };
export default ensureParamsIsValidMiddleware;
