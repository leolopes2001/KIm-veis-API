export interface ICreateSessionResquest {
  email: string;
  password: string;
}

export interface ICreateSessionResponse {
  token: string;
}
