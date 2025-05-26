import { authApi, API_ENDPOINT } from "@/libs/services/axios";
import { cleanParams, extractPagination } from "@/libs/utils";
import { GetPostParams, Post, PostPayload, PostResponse } from "@/types/post";

export const getPosts = async (
  params?: GetPostParams
): Promise<PostResponse> => {
  try {
    const queryParams = cleanParams({
      page: params?.page,
      per_page: params?.limit,
      title: params?.title,
    });
    console.log(queryParams);
    const { data, headers } = await authApi.get<Post[]>(API_ENDPOINT.POST, {
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

export const updatePost = async (id: number, payload: PostPayload) => {
  try {
    const { data } = await authApi.put(`${API_ENDPOINT.POST}/${id}`, payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createPost = async (payload: PostPayload) => {
  try {
    const { data } = await authApi.post(API_ENDPOINT.POST, payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePost = async (id: number) => {
  try {
    const { data } = await authApi.delete(`${API_ENDPOINT.POST}/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
