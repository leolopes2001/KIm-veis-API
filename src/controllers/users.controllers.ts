import { Request, Response } from "express";
import {
  ICreateUserRequest,
  IUpdateUserRequest,
} from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: ICreateUserRequest = req.body;
  const createdUser = await createUserService(userData);
  return res.status(201).json(createdUser);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const updateUserData: IUpdateUserRequest = req.body;
  const idForUpdateUser: string = req.params.id;

  const updatedUser = await updateUserService(updateUserData, idForUpdateUser);
  return res.json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const foundUser = req.foundUser;
  await deleteUserService(foundUser);
  return res.status(204).json({});
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};
