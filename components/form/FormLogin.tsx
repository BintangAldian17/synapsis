"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/libs/hooks/use-auth";
import { Button, Form, Input, Checkbox } from "antd";
import { useRouter } from "next/navigation";

type LoginPayload = {
  email: string;
  access_token: string;
  rememberMe?: boolean;
};

const FormLogin = () => {
  const router = useRouter();
  const { signIn, getRememberedCredentials, saveRememberedCredentials } =
    useAuth();
  const [form] = Form.useForm();

  const onSubmit = (value: LoginPayload) => {
    signIn(value.access_token, value);
    if (value.rememberMe) {
      saveRememberedCredentials(value.email, value.access_token);
    }
    router.push("/");
    form.resetFields();
  };

  useEffect(() => {
    const { email: rememberedEmail, accessToken: rememberedAccessToken } =
      getRememberedCredentials();

    if (rememberedEmail && rememberedAccessToken) {
      form.setFieldsValue({
        email: rememberedEmail,
        access_token: rememberedAccessToken,
        rememberMe: true,
      });
    }
  }, [form, getRememberedCredentials]);

  return (
    <Form
      layout="vertical"
      style={{ maxWidth: 568 }}
      form={form}
      onFinish={onSubmit}
      className="mt-1.5"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email address" },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        label="Access Token"
        name="access_token"
        rules={[{ required: true, message: "Access token is required" }]}
      >
        <Input.Password placeholder="Enter access token" />
      </Form.Item>

      <Form.Item name="rememberMe" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item className="mt-4">
        <Button className="w-full" type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
