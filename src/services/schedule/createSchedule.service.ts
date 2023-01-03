import AppError from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";
import {
  propertyRepository,
  scheduleRepository,
  userRepository,
} from "../../repositories";

const createScheduleService = async (
  scheduleData: IScheduleRequest,
  userId: number
): Promise<any> => {
  const property = await propertyRepository
    .createQueryBuilder("properties")
    .where("properties.id = :id", { id: scheduleData.propertyId })
    .getOne();

  if (!property) {
    throw new AppError("CategoryId not found", 404);
  }

  const foundScheduleUser = await scheduleRepository
    .createQueryBuilder("schedules_users_properties")
    .innerJoinAndSelect("schedules_users_properties.user", "user")
    .where("schedules_users_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .andWhere("schedules_users_properties.date = :date", {
      date: scheduleData.date,
    })
    .andWhere("user.id = :id", { id: userId })
    .getMany();

  if (foundScheduleUser.length) {
    throw new AppError("Erro schedule", 409);
  }

  const date = new Date(`${scheduleData.date} ${scheduleData.hour}`);
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if ((hours < 8 || hours >= 18) && minutes !== 0) {
    throw new AppError("Schedules outside office hours are not permitted!");
  }

  if (day === 0 || day === 6) {
    throw new AppError("Schedules on weekends are not allowed!");
  }

  const foundUser = await userRepository
    .createQueryBuilder("users")
    .select("users")
    .where("users.id = :id", { id: userId })
    .getOne();

  const foundProperty = await propertyRepository
    .createQueryBuilder("properties")
    .select("properties")
    .where("properties.id = :id", { id: scheduleData.propertyId })
    .getOne();

  const schedule = scheduleRepository.create({
    user: foundUser,
    property: foundProperty,
    date: scheduleData.date,
    hour: scheduleData.hour,
  });

  await scheduleRepository.save(schedule);

  return { message: "Schedule created with suceess" };
};

export default createScheduleService;

// ✕ POST /schedules -  must not be able to create a schedule that already exists on a property (660 ms)

// ✕ POST /schedules -  the user must not be able to make 2 schedules in different properties with the same date and time (613 ms)

// Não pode ser possível agendar uma visita a um imóvel com a mesma data e hora, essa verificação deve ser implementada com query builder.

// Não pode ser possível um usuário agendar uma visita a 2 imóveis diferentes com a mesma data e hora, essa verificação deve ser implementada com query builder.
