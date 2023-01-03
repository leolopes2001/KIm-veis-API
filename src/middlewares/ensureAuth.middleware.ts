import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) throw new AppError("Invalid token", 401);

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
    if (error) throw new AppError(error.message, 401);

    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
