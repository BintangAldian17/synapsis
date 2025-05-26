"use client";

import { Flex, Spin } from "antd";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { UserStatistic } from "@/types/statistic";
import { LoadingOutlined } from "@ant-design/icons";

const UserStatusCharts = ({
  userStatistic,
  loading,
}: {
  userStatistic: UserStatistic | undefined;
  loading: boolean;
}) => {
  const userStatusChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userStatistic || loading) return;

    if (!userStatusChartRef.current) {
      console.error(
        "userStatusChartRef.current is null. Chart cannot be initialized."
      );
      return;
    }

    const chartInstance = echarts.init(userStatusChartRef.current, null, {});

    const totalUsers = 10;
    const activeUsers = userStatistic.totalActive;
    const inactiveUsers = userStatistic.totalInActive;

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        show: true,
        orient: "vertical",
        left: "60%",
        top: "50%",
        itemGap: 10,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: "#1C1C1E",
          fontFamily: "Sora",
        },
        data: [
          { name: "Active", icon: "roundRect" },
          { name: "Non Active", icon: "roundRect" },
        ],
      },
      series: [
        {
          name: "User Status Ring",
          type: "pie",
          radius: ["80%", "100%"],
          center: ["35%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: inactiveUsers,
              name: "Non Active",
              itemStyle: {
                color: "#188CB0",
                fontFamily: "Sora",
              },
            },
            {
              value: totalUsers - inactiveUsers,
              name: "Remaining Inactive",
              itemStyle: {
                color: "#F2F2F7",
                fontFamily: "Sora",
              },
            },
          ],
        },
        {
          name: "User Status Ring",
          type: "pie",
          radius: ["50%", "70%"],
          center: ["35%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
            fontFamily: "Sora",
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "20",
              fontWeight: "bold",
              fontFamily: "Sora",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: activeUsers,
              name: "Active",
              itemStyle: {
                color: "#5CC8BE",
                fontFamily: "Sora",
              },
            },
            {
              value: totalUsers - activeUsers,
              name: "Remaining Active",
              itemStyle: {
                color: "#F2F2F7",
                fontFamily: "Sora",
              },
            },
          ],
        },
      ],
      graphic: [
        {
          type: "text",
          left: "60%",
          top: "20%",
          style: {
            text: `${activeUsers}/${totalUsers}`,
            textAlign: "left",
            fill: "#333",
            fontSize: 32,
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
    resizeObserver.observe(userStatusChartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [userStatistic, loading]);

  return (
    <Flex
      vertical
      className="border-border border rounded-md pt-[20px] px-[24px] pb-[16px] flex-[2]"
      gap={16}
    >
      <span className="text-lg font-semibold text-gray-800">User Status</span>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <div className="flex h-full">
          <div ref={userStatusChartRef} className="w-full h-full" />
        </div>
      )}
    </Flex>
  );
};

export default UserStatusCharts;
