import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const ensureAdmPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    throw new AppError(
      "You don't have permission to access this resource.",
      403
    );
  }

  return next();
};

export default ensureAdmPermissionMiddleware;
