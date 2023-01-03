import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICategoryRequest } from "../interfaces/categories";

export const SchmaeCreateCategory: SchemaOf<ICategoryRequest> = yup
  .object()
  .shape({
    name: yup.string().min(1).max(60).required(),
  });
