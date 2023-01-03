import { NextFunction, Request, Response } from "express";
import User from "../entities/user.entitty";
import AppError from "../errors/AppError";
import { userRepository } from "../repositories";

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser: User = (
    await userRepository.find({ withDeleted: true })
  ).find((user) => user.id === req.params.id);

  if (!foundUser) throw new AppError("User not exists", 404);

  if (!foundUser.isActive) {
    throw new AppError("User has already been deleted", 400);
  }

  req.foundUser = { ...(foundUser as User) };

  return next();
};

export default ensureUserExistsMiddleware;
