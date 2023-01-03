import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const ensureSomeFieldsWereNotSentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keys = Object.keys(req.body);

  const isEqual = (key: string): boolean => {
    switch (key) {
      case "id":
        return true;
      case "isAdm":
        return true;
      case "isActive":
        return true;
      default:
        return false;
    }
  };

  if (keys.some(isEqual)) {
    throw new AppError(
      "It's not allowed to update id, isAdm and isActive fields.",
      401
    );
  }

  return next();
};

export default ensureSomeFieldsWereNotSentMiddleware;
