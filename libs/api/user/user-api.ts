import { authApi, API_ENDPOINT } from "@/libs/services/axios";
import { cleanParams, extractPagination } from "@/libs/utils";
import { GetUsersParams, User, UserPayload, UserResponse } from "@/types/user";

export const getUsers = async (
  params?: GetUsersParams
): Promise<UserResponse> => {
  try {
    const queryParams = cleanParams({
      page: params?.page,
      per_page: params?.limit,
      gender: params?.gender,
      status: params?.status,
      name: params?.name,
      email: params?.name,
    });
    const { data, headers } = await authApi.get<User[]>(API_ENDPOINT.USER, {
      params: queryParams,
    });
    const pagination = extractPagination(headers);
    return {
      data,
      meta: pagination,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserById = async (userId: number) => {
  try {
    const { data } = await authApi.get<User>(`${API_ENDPOINT.USER}/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUser = async (id: number, payload: UserPayload) => {
  try {
    const { data } = await authApi.put(`${API_ENDPOINT.USER}/${id}`, payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const { data } = await authApi.delete(`${API_ENDPOINT.USER}/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createUser = async (payload: UserPayload) => {
  try {
    const { data } = await authApi.post(API_ENDPOINT.USER, payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
