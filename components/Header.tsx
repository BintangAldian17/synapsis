"use client";

import React from "react";
import { Layout, Avatar, Typography, Dropdown, Flex } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useAuth } from "@/libs/hooks/use-auth";
import Link from "next/link";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

function Header() {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const userName = user?.email.split("@")[0] ?? "";
  return (
    <AntHeader className="bg-bg-container border-b !top-0 !z-[500] !sticky !border-border px-[32px] py-[12px] h-[var(--header-height)] flex justify-between items-center">
      <Link href="/" className="flex gap-[8px]">
        <Image src="/logo.png" alt="logo" width={28} height={28} />
        <Flex vertical gap={5}>
          <Text className="text-text font-bold text-lg leading-[1.2]">
            BloX App
          </Text>
          <Text className="text-text-secondary !text-[7px] leading-[1]">
            part of Great Applications
          </Text>
        </Flex>
      </Link>

      <Dropdown
        menu={{
          items: [
            { key: "1", label: "Profile" },
            { key: "2", label: "Settings" },
            { key: "3", label: "Logout" },
          ],
        }}
        trigger={["click"]}
      >
        <Flex align="center" className="cursor-pointer" gap={12}>
          <Avatar
            size={32}
            src="/user.png"
            icon={<UserOutlined />}
            className="border border-border"
          />
          <Flex vertical className="w-[132px]">
            <Text className="text-text font-semibold !text-icon">
              {userName}
            </Text>
            <Text className="!text-text-secondary !text-icon">
              Superintendent
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </Dropdown>
    </AntHeader>
  );
}

export default Header;
