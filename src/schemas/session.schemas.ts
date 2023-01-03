import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateSessionResquest } from "../interfaces/session.interfaces";

export const SchemaCreateSession: SchemaOf<ICreateSessionResquest> = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
