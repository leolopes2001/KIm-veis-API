import * as express from "express";
import User from "../../entities/user.entitty";
import { IUser } from "../../interfaces/users.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        isAdm: boolean;
      };
      foundUser: IUser;
    }
  }
}
