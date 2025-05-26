"use client";

import React from "react";
import { Breadcrumb, Space, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon } from "./icons/DashboardIcon";

const { Text } = Typography;

const itemsMap = [
  { path: "/", title: "Dashboard" },
  { path: "/create-user", title: "Create User" },
  { path: "/create-post", title: "Create Post" },
];

type PageHeaderProps = {
  title: string;
};

const PageHeader = ({ title }: PageHeaderProps) => {
  const pathname = usePathname();

  const breadcrumbItems = itemsMap.filter((item) =>
    pathname === "/"
      ? item.path === "/"
      : item.path === "/" || pathname.startsWith(item.path)
  );

  return (
    <div className="px-[32px] pt-[24px] pb-[16px]">
      <Space direction="vertical" size={8}>
        <Text strong className="!text-xl !text-text">
          {title}
        </Text>

        <Breadcrumb
          items={breadcrumbItems.map((item, index) => ({
            title:
              index === breadcrumbItems.length - 1 &&
              breadcrumbItems.length > 1 ? (
                <Text className="!text-sm font-bold">{item.title}</Text>
              ) : (
                <Link
                  href={item.path}
                  className="!text-sm !text-primary flex items-center gap-[6px]"
                >
                  <DashboardIcon className="text-inherit size-[12px]" />
                  {item.title}
                </Link>
              ),
          }))}
        />
      </Space>
    </div>
  );
};

export default PageHeader;
