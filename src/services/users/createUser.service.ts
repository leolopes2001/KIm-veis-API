import AppError from "../../errors/AppError";
import { ICreateUserRequest, IUser } from "../../interfaces/users.interfaces";
import { userRepository } from "../../repositories";
import { SchemaReturnedUser } from "../../schemas/users.schemas";

const createUserService = async (
  userData: ICreateUserRequest
): Promise<IUser> => {
  const foundUser = await userRepository.findOne({
    withDeleted: true,
    where: {
      email: userData.email,
    },
  });

  if (foundUser) throw new AppError("Email already registered", 409);

  const createdUser = userRepository.create(userData);

  await userRepository.save(createdUser);

  const userWithoutPassord: IUser = await SchemaReturnedUser.validate(
    createdUser,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPassord;
};

export default createUserService;
