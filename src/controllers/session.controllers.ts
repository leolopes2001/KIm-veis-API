import { Request, Response } from "express";
import { ICreateSessionResquest } from "../interfaces/session.interfaces";
import createSessionService from "../services/session/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  const createSessionData: ICreateSessionResquest = req.body;
  const token = await createSessionService(createSessionData);
  return res.json(token);
};

export { createSessionController };
