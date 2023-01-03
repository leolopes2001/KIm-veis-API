import AppDataSource from "../data-source";
import Address from "../entities/address.entity";
import Categories from "../entities/categories.entity";
import Properties from "../entities/properties.entity";
import SchedulesUsersProperties from "../entities/schedules_users_properties.entity";

import User from "../entities/user.entitty";

const userRepository = AppDataSource.getRepository(User);
const categoryRepository = AppDataSource.getRepository(Categories);
const propertyRepository = AppDataSource.getRepository(Properties);
const addresRepository = AppDataSource.getRepository(Address);
const scheduleRepository = AppDataSource.getRepository(
  SchedulesUsersProperties
);

export {
  userRepository,
  categoryRepository,
  propertyRepository,
  addresRepository,
  scheduleRepository
};
