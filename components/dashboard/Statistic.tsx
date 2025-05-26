"use client";

import { Flex, Space, Typography } from "antd";
import React, { useMemo } from "react";
import Card from "./Card";
import {
  usePostStatistic,
  useUserStatistic,
} from "@/libs/api/statistic/statistic-query";
import Charts from "./charts/Charts";

const { Title } = Typography;

const Statistic = () => {
  const userStatistic = useUserStatistic();
  const postStatistic = usePostStatistic();

  const dataUser = userStatistic.data;
  const dataPost = postStatistic.data;

  const statisticCards = useMemo(() => {
    return [
      {
        value: `${dataUser?.totalUser ?? 0}`,
        title: "Total User",
      },
      {
        value: `${dataPost?.totalPost ?? 0}`,
        title: "Total Post",
      },
      {
        value: `${dataUser?.totalActive ?? 0}/${dataUser?.totalInActive}`,
        title: "User Status (Active/non)",
      },
      {
        value: `${dataUser?.totalMale ?? 0}/${dataUser?.totalFemale}`,
        title: "User Gender(m/f)",
      },
    ];
  }, [dataUser, dataPost]);

  return (
    <div className="mb-[22px] px-[32px]">
      <div className=" mb-[24px]">
        <Space direction="vertical" size={16} className="w-full">
          <Title level={4} className="!m-0 !text-text">
            Statistic
          </Title>
          <Flex gap={24}>
            {statisticCards.map((statistic) => (
              <Card
                loading={
                  userStatistic.status === "pending" ||
                  postStatistic.status === "pending"
                }
                statisticsData={statistic}
                key={statistic.title}
              />
            ))}
          </Flex>
        </Space>
      </div>
      <Charts
        postStatistic={dataPost}
        userStatistic={dataUser}
        loadingPostStatisic={postStatistic.status === "pending"}
        loadingUserStatisic={userStatistic.status === "pending"}
      />
    </div>
  );
};

export default Statistic;
