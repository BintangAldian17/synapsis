import { GetPostParams, PostPayload, PostResponse } from "@/types/post";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createPost, deletePost, getPosts, updatePost } from "./post-api";
import { API_ENDPOINT } from "@/libs/services/axios";

export const usePosts = (
  params?: GetPostParams,
  options?: Omit<UseQueryOptions<PostResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: [API_ENDPOINT.POST, params],
    queryFn: () => getPosts(params),
    ...options,
  });
};

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: ({ payload, id }: { payload: PostPayload; id: number }) =>
      updatePost(id, payload),
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (payload: PostPayload) => createPost(payload),
  });
};

export const useDeletePost = () => {
  return useMutation<unknown, unknown, number>({
    mutationFn: (id) => deletePost(id),
  });
};
