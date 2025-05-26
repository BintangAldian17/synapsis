"use client";
import { Flex, Typography } from "antd";
import React from "react";

const Footer = () => {
  return (
    <Flex vertical justify="center" align="center" gap={16}>
      <div className="text-center">
        <Typography.Text className="text-text-secondary">
          Copyright © 2024{" "}
          <Typography.Text className="text-text-tertiary font-bold">
            BloX App
          </Typography.Text>
        </Typography.Text>
        <br />
        <Typography.Text className="text-text-secondary">
          All Rights Reserved
        </Typography.Text>
      </div>
      <Typography.Text className="text-text-secondary">
        App version 1.0.0
      </Typography.Text>
    </Flex>
  );
};

export default Footer;
