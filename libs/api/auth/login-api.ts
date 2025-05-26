import { api, API_ENDPOINT } from "@/libs/services/axios";
import { LoginParams } from "@/types/auth";
import { User, UserPayload } from "@/types/user";

export const getUsersLogin = async (params?: LoginParams): Promise<User[]> => {
  try {
    const { data } = await api.get<User[]>(API_ENDPOINT.USER, {
      params: params,
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkAccessToken = async (
  id: number,
  payload: UserPayload,
  access_token: string
) => {
  console.log(access_token);
  try {
    const { data } = await api.put(`${API_ENDPOINT.USER}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
