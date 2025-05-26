import { PaginationInfo } from "@/libs/utils";

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type PostResponse = {
  data: Post[];
  meta: PaginationInfo;
};

export type PostPayload = {
  user_id: number;
  title: string;
  body: string;
};

export interface GetPostParams {
  page?: number;
  limit?: number;
  title?: string;
}
