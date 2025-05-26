import { User } from "./user";

export type LoginPayload = {
  email: string;
  access_token: string;
};

export type LoginParams = {
  email?: string;
};

export type LoginResponse = {
  data: User[];
};
