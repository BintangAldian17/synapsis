"use client";

import Footer from "@/components/Footer";
import FormLogin from "@/components/form/FormLogin";
import { Flex, Typography } from "antd";
import Image from "next/image";

export default function Login() {
  return (
    <main className="min-h-screen w-full">
      <Flex>
        <div className="flex-1 pt-[60px] pl-[50px] pb-[56px] ">
          <Flex justify="space-between" vertical className="h-full !w-[568px]">
            {/* Logo */}
            <Flex gap={24} align="center">
              <div className="relative size-[56px]">
                <Image
                  src="/logo.png"
                  alt="imaeg login"
                  fill
                  className="object-cover"
                />
              </div>
              <Typography.Text strong className="text-[32px]">
                BloX App
              </Typography.Text>
            </Flex>
            {/* Login Form */}
            <div>
              <Typography.Text strong className="text-[24px]">
                Login
              </Typography.Text>
              <FormLogin />
            </div>
            {/* Footer */}
            <Footer />
          </Flex>
        </div>
        <div className="relative h-screen w-full flex-1">
          <Image
            src="/login-background-img.png"
            alt="imaeg login"
            fill
            className="object-cover"
          />
        </div>
      </Flex>
    </main>
  );
}
