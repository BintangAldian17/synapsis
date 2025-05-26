"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Flex, Spin } from "antd";
import { UserStatistic } from "@/types/statistic";
import { LoadingOutlined } from "@ant-design/icons";

const GenderDistributionCharts = ({
  loading,
  userStatistic,
}: {
  loading: boolean;
  userStatistic: UserStatistic | undefined;
}) => {
  const genderDistributionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || !userStatistic) return;
    if (!genderDistributionRef.current) {
      console.log(
        "genderDistributionRef.current is null. Gender Distribution Chart cannot be initialized."
      );
      return;
    }

    const chartInstance = echarts.init(genderDistributionRef.current, null, {});
    const malePosts = userStatistic.totalMale;
    const femalePosts = userStatistic.totalFemale;
    const totalPosts = malePosts + femalePosts;

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        show: true,
        orient: "horizontal",
        left: "start",
        top: "bottom",
        itemGap: 20,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: "#1C1C1E",
          fontFamily: "Sora",
        },
      },
      series: [
        {
          name: "Gender Distribution",
          type: "pie",
          radius: ["45%", "60%"],
          center: ["50%", "35%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
            fontFamily: "Sora",
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: malePosts,
              name: "Male",
              itemStyle: {
                color: "#7851A9",
                fontFamily: "Sora",
              },
            },
            {
              value: femalePosts,
              name: "Female",
              itemStyle: {
                color: "#4682B4",
                fontFamily: "Sora",
              },
            },
          ],
        },
      ],
      graphic: [
        {
          type: "text",
          left: "center",
          top: "25%",
          style: {
            text: "Total",
            textAlign: "center",
            fill: "#333",
            fontSize: 16,
            fontWeight: "normal",
            fontFamily: "Sora",
          },
        },
        {
          type: "text",
          left: "center",
          top: "35%",
          style: {
            text: `${totalPosts}`,
            textAlign: "center",
            fill: "#333",
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "Sora",
          },
        },
      ],
    };

    chartInstance.setOption(option);
    chartInstance.resize();

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
    resizeObserver.observe(genderDistributionRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [userStatistic, loading]);

  return (
    <Flex
      vertical
      className="border-border border rounded-md pt-[20px] px-[24px] pb-[16px] flex-[3]"
      gap={16}
      justify="space-between"
    >
      <span className="text-lg font-semibold text-gray-800">
        Post Distribution by Gender
      </span>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <div ref={genderDistributionRef} className="w-full h-full" />
      )}
    </Flex>
  );
};

export default GenderDistributionCharts;
