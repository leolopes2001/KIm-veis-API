import { IUser } from "../../interfaces/users.interfaces";
import { userRepository } from "../../repositories";

const deleteUserService = async (foundUser: IUser): Promise<{}> => {
  await userRepository.softRemove(foundUser);

  const deletedUser = await userRepository.save({
    ...foundUser,
    isActive: false,
  });

  console.log(deletedUser);

  return {};
};

export default deleteUserService;
