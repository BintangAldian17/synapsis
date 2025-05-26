import { API_ENDPOINT } from "@/libs/services/axios";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./user-api";
import { GetUsersParams, User, UserPayload, UserResponse } from "@/types/user";

export const useUsers = (
  params?: GetUsersParams,
  options?: Omit<UseQueryOptions<UserResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [API_ENDPOINT.USER, params],
    queryFn: () => getUsers(params),
    ...options,
  });
};
export const useUserById = (
  userId: number,
  options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [API_ENDPOINT.USER, userId],
    queryFn: () => getUserById(userId),
    ...options,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ payload, id }: { payload: UserPayload; id: number }) =>
      updateUser(id, payload),
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (payload: UserPayload) => createUser(payload),
  });
};

export const useDeleteUser = () => {
  return useMutation<unknown, unknown, number>({
    mutationFn: (id) => deleteUser(id),
  });
};
