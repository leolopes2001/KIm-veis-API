import { compare } from "bcryptjs";
import AppError from "../../errors/AppError";
import {
  ICreateSessionResponse,
  ICreateSessionResquest,
} from "../../interfaces/session.interfaces";

import jwt from "jsonwebtoken";
import { userRepository } from "../../repositories";

const createSessionService = async ({
  email,
  password,
}: ICreateSessionResquest): Promise<ICreateSessionResponse> => {
  const foundUser = await userRepository.findOne({
    where: {
      email,
    },
    withDeleted: true,
  });

  if (!!foundUser && foundUser.isActive === false) {
    throw new AppError("Email or passowrd invalid", 400);
  }

  if (!foundUser) throw new AppError("Email or passowrd invalid", 403);

  const passwordMatch = await compare(password, foundUser.password);

  if (!passwordMatch) throw new AppError("Email or password invalid", 403);

  const token = jwt.sign({ isAdm: foundUser.isAdm }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: String(foundUser.id),
  });

  return { token };
};

export default createSessionService;
