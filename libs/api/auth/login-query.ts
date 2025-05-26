import { API_ENDPOINT } from "@/libs/services/axios";
import { LoginParams } from "@/types/auth";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { checkAccessToken, getUsersLogin } from "./login-api";
import { User, UserPayload } from "@/types/user";

export const useUsersLogin = (
  params?: LoginParams,
  options?: Omit<UseQueryOptions<User[]>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [API_ENDPOINT.USER, params],
    queryFn: () => getUsersLogin(params),
    ...options,
  });
};

export const useCheckAccessToken = () => {
  return useMutation({
    mutationFn: ({
      payload,
      id,
      access_token,
    }: {
      payload: UserPayload;
      id: number;
      access_token: string;
    }) => checkAccessToken(id, payload, access_token),
  });
};
