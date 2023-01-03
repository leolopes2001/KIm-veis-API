import * as yup from "yup";
import { SchemaOf } from "yup";

import {
  ICreateUserRequest,
  IUser,
  IUpdateUserRequest,
} from "../interfaces/users.interfaces";

export const SchemaCreateUser: SchemaOf<ICreateUserRequest> = yup
  .object()
  .shape({
    name: yup.string().min(2).max(60).required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
    password: yup.string().min(4).required(),
  });

export const SchemaReturnedUser: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().uuid(),
  name: yup.string(),
  email: yup.string().email(),
  isActive: yup.boolean(),
  isAdm: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});

export const SchemaUpdateUser: SchemaOf<IUpdateUserRequest> = yup
  .object()
  .shape({
    email: yup.string().email(),
    name: yup.string().min(2).max(60),
    password: yup.string().min(4),
  });

export const SchemaParamsUUID: SchemaOf<{ uuid: string }> = yup.object().shape({
  uuid: yup.string().uuid(),
});

export const SchemaListUsers = yup.array().of(SchemaReturnedUser);
