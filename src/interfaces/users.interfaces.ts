export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateUserRequest {
  name: string;
  password: string;
  email: string;
}

export type IListUsersResponse = Array<IUser>;
