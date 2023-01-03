import * as yup from "yup";
import { SchemaOf } from "yup";
import { IScheduleRequest } from "../interfaces/schedules";

export const SchemaCreateSchedule: SchemaOf<IScheduleRequest> = yup
  .object()
  .shape({
    date: yup.string().required(),
    propertyId: yup.string().uuid().required(),
    userId: yup.string().notRequired(),
    hour: yup.string().required(),
  });

export const SchemaResponseSchedule = yup.object().shape({
  schedules: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid().required(),
      date: yup.string().required(),
      hour: yup.string().required(),
      user: yup.string().required(),
    })
  ),
});

