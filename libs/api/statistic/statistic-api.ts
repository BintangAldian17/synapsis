import { API_ENDPOINT, authApi } from "@/libs/services/axios";
import { extractPagination } from "@/libs/utils";

export const getPostByUserId = async (userId: number) => {
  try {
    const { data, headers } = await authApi.get(
      `${API_ENDPOINT.USER}/${userId}/posts`
    );
    const pagination = extractPagination(headers);
    return {
      data,
      meta: pagination,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
