import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../user/user-api";
import { getPosts } from "../post/post-api";
import { getPostByUserId } from "./statistic-api";

export const useUserStatistic = () => {
  return useQuery({
    queryKey: ["statistic-user"],
    queryFn: () => getUsers(),
    select: (data) => {
      const userStatistic = {
        totalUser: data.meta.total,
        totalActive: 0,
        totalInActive: 0,
        totalMale: 0,
        totalFemale: 0,
      };
      data.data.forEach((user) => {
        if (user.status === "active") {
          userStatistic.totalActive += 1;
        }
        if (user.status === "inactive") {
          userStatistic.totalInActive += 1;
        }
        if (user.gender === "female") {
          userStatistic.totalFemale += 1;
        }
        if (user.gender === "male") {
          userStatistic.totalMale += 1;
        }
      });
      return userStatistic;
    },
  });
};

export const usePostStatistic = () => {
  return useQuery({
    queryKey: ["statistic-post"],
    queryFn: async () => {
      const postsResponse = await getPosts();
      const totalPost = postsResponse.meta.total;

      const users = await getUsers();

      const postUserQuantityPromises = users.data.map(async (user) => {
        try {
          const userPosts = await getPostByUserId(user.id);
          return {
            userName: user.name,
            postCount: userPosts.meta.total,
          };
        } catch (error) {
          console.warn(`Failed to get post by user id ${user.id}`, error);
          return {
            userName: user.name,
            postCount: 0,
          };
        }
      });

      const postUserQuantity = await Promise.all(postUserQuantityPromises);

      return {
        totalPost,
        postUserQuantity,
      };
    },
  });
};
