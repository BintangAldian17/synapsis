"use client";

import React from "react";
import { Card as AntdCard, Flex, Typography } from "antd";

type CardProps = {
  statisticsData: { value: string; title: string };
  loading: boolean;
};

const Card = ({ statisticsData, loading }: CardProps) => {
  return (
    <AntdCard
      loading={loading}
      style={{
        borderColor: "#D3D3D3",
        padding: "20px 24px",
        width: "100%",
      }}
    >
      <Flex vertical gap={8}>
        <Typography.Text className="text-[#AFAFAF]">
          {statisticsData.title}
        </Typography.Text>
        <Typography.Text strong style={{ fontSize: 32, fontWeight: 600 }}>
          {statisticsData.value}
        </Typography.Text>
      </Flex>
    </AntdCard>
  );
};

export default Card;
