import { IListUsersResponse } from "../../interfaces/users.interfaces";
import { userRepository } from "../../repositories";
import { SchemaListUsers } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<IListUsersResponse> => {
  const users = await userRepository.find({ withDeleted: true });

  const usersWithoutPassord: IListUsersResponse =
    await SchemaListUsers.validate(users, {
      stripUnknown: true,
    });

  return usersWithoutPassord;
};

export default listUsersService;
