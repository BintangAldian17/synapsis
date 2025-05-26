"use client";

import React from "react";
import type { MenuProps } from "antd";
import { Menu, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";
import { DashboardIcon } from "./icons/DashboardIcon";
import { UserIcon } from "./icons/UserIcon";
import { ChatIcon } from "./icons/ChatIcon";
import Footer from "./Footer";
import { ChevronLeftIcon } from "./icons/ChevronLeftIcon";

type MenuItem = Required<MenuProps>["items"][number];

const getMenuItems = (isOpen: boolean): MenuItem[] => [
  {
    key: "dsh",
    label: isOpen ? "Dashboard" : undefined,
    type: "group",
    children: [
      {
        key: "1",
        label: (
          <Link
            href="/"
            className={cn(
              "flex items-center",
              isOpen ? "gap-[8px] ml-[24px]" : "justify-center"
            )}
          >
            <DashboardIcon className="text-inherit" />
            {isOpen && <span className="text-inherit">Dashboard</span>}
          </Link>
        ),
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "blgm",
    label: isOpen ? "Blog Management" : undefined,
    type: "group",
    children: [
      {
        key: "2",
        label: (
          <Link
            href="/create-user"
            className={cn(
              "flex items-center",
              isOpen ? "gap-[8px] ml-[24px]" : "justify-center"
            )}
          >
            <UserIcon className="text-inherit" />
            {isOpen && <span className="text-inherit">Create User</span>}
          </Link>
        ),
      },
      {
        key: "3",
        label: (
          <Link
            href="/create-post"
            className={cn(
              "flex items-center",
              isOpen ? "gap-[8px] ml-[24px]" : "justify-center"
            )}
          >
            <ChatIcon className="text-inherit" />
            {isOpen && <span className="text-inherit">Create Post</span>}
          </Link>
        ),
      },
    ],
  },
];

// Mapping path to menu key
const pathToKeyMap: Record<string, string> = {
  "/": "1",
  "/create-user": "2",
  "/create-post": "3",
};

const Navbar = () => {
  const pathname = usePathname();
  const selectedKey = pathToKeyMap[pathname] || "1";
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="relative flex h-auto min-h-0  border-r border-[#d3d3d3] bg-[#f9f9f9]">
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden relative z-10 flex flex-col pb-[27px] h-full pt-[32px]",
          isOpen ? "w-[288px]" : "w-[100px]"
        )}
      >
        <Menu
          selectedKeys={[selectedKey]}
          defaultOpenKeys={["dsh"]}
          mode="inline"
          className="!border-none"
          items={getMenuItems(isOpen)}
        />

        <div className={cn("mt-auto", !isOpen && "hidden")}>
          <Footer />
        </div>
      </div>

      {/* Collapse Button */}
      <div className="relative z-20 -mr-[13px] mt-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="size-[24px] rounded-full bg-border flex items-center justify-center shadow"
        >
          <ChevronLeftIcon
            className={cn(
              "transition-transform duration-300 size-[16px]",
              !isOpen && "rotate-180"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
