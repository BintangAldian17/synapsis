"use client";
import "@ant-design/v5-patch-for-react-19";

import React from "react";
import { DashOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";

import { useModal } from "@/context/ModalContext";

type TableActionProps = {
  onClickAction: (actionType: "delete" | "update") => void;
};

function TableAction({ onClickAction }: TableActionProps) {
  const { openModal } = useModal();

  const items: MenuProps["items"] = [
    {
      label: (
        <span className="flex gap-[5px]">
          <EditOutlined />
          Update
        </span>
      ),
      onClick: () => {
        onClickAction("update");
        openModal();
      },
      key: "0",
    },
    {
      label: (
        <span className="flex gap-[5px]">
          <DeleteOutlined />
          Delete
        </span>
      ),
      key: "1",
      onClick: () => onClickAction("delete"),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button>
          <DashOutlined />
        </Button>
      </Dropdown>
    </>
  );
}

export default TableAction;
