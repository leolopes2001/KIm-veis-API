import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAddressRequest, IPropertyRequest } from "../interfaces/properties";

export const SchemaAddress: SchemaOf<IAddressRequest> = yup.object().shape({
  city: yup.string().min(1).max(20).required(),
  number: yup.string().min(1).max(10).notRequired(),
  district: yup.string().min(1).max(40).required(),
  state: yup.string().min(1).max(2).required(),
  zipCode: yup.string().min(1).max(8).required(),
});

export const SchemaProperty: SchemaOf<IPropertyRequest> = yup.object().shape({
  value: yup.number().positive().required(),
  size: yup.number().positive().required(),
  address: SchemaAddress,
  categoryId: yup.string().uuid().required(),
});
