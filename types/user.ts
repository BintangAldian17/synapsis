import { PaginationInfo } from "@/libs/utils";

export type Gender = "female" | "male";
export type Status = "active" | "inactive";

export type User = {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
};

export type UserResponse = {
  data: User[];
  meta: PaginationInfo;
};

export type UserPayload = {
  name: string;
  email: string;
  gender: Gender;
  status: Status;
};

export interface GetUsersParams {
  page?: number;
  limit?: number;
  gender?: Gender;
  status?: Status;
  name?: string;
  email?: string;
}
