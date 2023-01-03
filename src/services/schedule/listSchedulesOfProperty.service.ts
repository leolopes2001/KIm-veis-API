import AppError from "../../errors/AppError";
import { propertyRepository, scheduleRepository } from "../../repositories";
import { SchemaResponseSchedule } from "../../schemas/schedule.schemas";

const listSchedulesOfPropertyService = async (propertyId: string) => {
  const foundSchedule = await propertyRepository
    .createQueryBuilder("properties")
    .where("properties.id = :id", {
      id: propertyId,
    })
    .getOne();

  if (!foundSchedule) {
    throw new AppError("Invalid property id", 404);
  }

  return [
    await scheduleRepository
      .createQueryBuilder("schedules")
      .innerJoinAndSelect("schedules.user", "user")
      .where("schedules.propertyId = :id", { id: propertyId })
      .getOne(),
  ];
};
export default listSchedulesOfPropertyService;

