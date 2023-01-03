import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createScheduleService from "../services/schedule/createSchedule.service";
import listSchedulesOfPropertyService from "../services/schedule/listSchedulesOfProperty.service";

const createScheduleController = async (req: Request, res: Response) => {
  const scheduleData: IScheduleRequest = req.body;
  const userId: number = req.user.id;

  const schedule = await createScheduleService(scheduleData, userId);
  return res.status(201).json(schedule);
};

const listSchedulesOfPropertyController = async (
  req: Request,
  res: Response
) => {
  const propertyId = req.params.id;
  const schedules = await listSchedulesOfPropertyService(propertyId);
  return res.json({ schedules });
};

export { createScheduleController, listSchedulesOfPropertyController };
