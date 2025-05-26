"use client";

import { Flex, Spin } from "antd";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { PostUserQuantity } from "@/types/statistic";
import { LoadingOutlined } from "@ant-design/icons";

const BlogCharts = ({
  postUserQuantity,
  loading,
}: {
  postUserQuantity: PostUserQuantity[] | undefined;
  loading: boolean;
}) => {
  const blogStatsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!postUserQuantity || loading) return;

    if (!blogStatsRef.current) {
      console.error(
        "blogStatsRef.current is null. Chart cannot be initialized."
      );
      return;
    }

    const usersName = postUserQuantity.map((post) => post.userName);
    const usersPostQuantity = postUserQuantity?.map((post) => post.postCount);
    const chartInstance = echarts.init(blogStatsRef.current, null, {});

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "20%",
        top: "20%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: usersName ?? [],
        name: "User Name",
        nameLocation: "start",
        nameGap: 0,
        nameTextStyle: {
          align: "left",
          verticalAlign: "top",
          color: "#A7A7A7",
          padding: [60, 0, 0, -40],
        },
        axisLine: {
          show: true,
          lineStyle: { color: "#ccc" },
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          color: "#000000",
          fontFamily: "Sora",
          rotate: 30,
          overflow: "truncate",
          width: 40,
          ellipsis: "...",
        },
      },
      yAxis: {
        type: "value",
        name: "Post",
        nameLocation: "end",
        interval: 20,
        nameGap: 20,
        nameTextStyle: {
          padding: [0, 0, 0, -30],
          color: "#A7A7A7",
          fontFamily: "Sora",
        },
        axisTick: { show: false },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: "Total Post",
          type: "bar",
          data: usersPostQuantity,
          itemStyle: {
            color: "#5CC8BE ",
            fontFamily: "Sora",
          },
          barWidth: 30,
          label: {
            show: false,
          },
        },
      ],
      legend: {
        show: true,
        orient: "horizontal",
        left: "left",
        bottom: "0%",
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: "#1C1C1E",
        },
      },
    };

    chartInstance.setOption(option);
    chartInstance.resize();

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
    resizeObserver.observe(blogStatsRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [postUserQuantity, loading]);

  return (
    <Flex
      vertical
      className=" border-border border flex-1 rounded-md py-[20px] px-[24px] h-[552px]"
    >
      <span className="text-lg font-semibold text-gray-800">
        Blog Post Quantity
      </span>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <div ref={blogStatsRef} className="w-full h-full" />
      )}
    </Flex>
  );
};

export default BlogCharts;
