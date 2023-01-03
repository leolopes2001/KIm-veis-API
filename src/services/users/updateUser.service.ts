import AppError from "../../errors/AppError";
import { IUpdateUserRequest, IUser } from "../../interfaces/users.interfaces";
import { userRepository } from "../../repositories";
import { SchemaReturnedUser } from "../../schemas/users.schemas";

const updateUserService = async (
  updatedUserData: IUpdateUserRequest,
  idForUpdateUser: string
): Promise<IUser> => {
  const foundUser = (await userRepository.find({ withDeleted: true })).find(
    (user) => user.id == idForUpdateUser
  );

  if (!foundUser) throw new AppError("User not found", 404);

  const updatedUser = userRepository.create({
    ...foundUser,
    ...updatedUserData,
  });

  await userRepository.save(updatedUser);

  const updatedUserWithoutPassword = await SchemaReturnedUser.validate(
    updatedUser,
    {
      stripUnknown: true,
    }
  );
  return updatedUserWithoutPassword;
};

export default updateUserService;
