"use client";

import { Flex } from "antd";
import BlogCharts from "./BlogCharts";
import UserStatusCharts from "./UserStatusCharts";
import GenderDistributionCharts from "./GenderDistributionCharts";
import { PostStatistic, UserStatistic } from "@/types/statistic";

type ChartsProps = {
  userStatistic: UserStatistic | undefined;
  postStatistic: PostStatistic | undefined;
  loadingPostStatisic: boolean;
  loadingUserStatisic: boolean;
};

export function Charts({
  postStatistic,
  userStatistic,
  loadingPostStatisic,
  loadingUserStatisic,
}: ChartsProps) {
  return (
    <Flex gap={24}>
      <div className="w-[70%] ">
        <BlogCharts
          postUserQuantity={postStatistic?.postUserQuantity}
          loading={loadingPostStatisic}
        />
      </div>
      <Flex vertical gap={24} className="w-[30%] max-h-full">
        <UserStatusCharts
          loading={loadingUserStatisic}
          userStatistic={userStatistic}
        />
        <GenderDistributionCharts
          loading={loadingUserStatisic}
          userStatistic={userStatistic}
        />
      </Flex>
    </Flex>
  );
}

export default Charts;
