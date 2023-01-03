import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const ensureUpdatePermissionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: idSession, isAdm } = req.user;

  const idToDeleteUser = req.params.id;

  if (String(idSession) === idToDeleteUser || isAdm) return next();

  throw new AppError("You don't have permission to access this resource.", 401);
};

export default ensureUpdatePermissionMiddleware;
