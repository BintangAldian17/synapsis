"use client";

import React from "react";
import { Form, Input, Select, Button, App } from "antd";
import { UserPayload } from "@/types/user";
import { useCreateUser, useUpdateUser } from "@/libs/api/user/user-query";
import { useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINT } from "@/libs/services/axios";
import { useModal } from "@/context/ModalContext";
import { AxiosError } from "axios";
import { MenuDownIcon } from "../icons/MenuDownIcon";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

type FormUserProps = {
  initialValues?: UserPayload;
  userId?: number;
  onCloseModal?: () => void;
  type: "update" | "create";
};

const FormUser: React.FC<FormUserProps> = ({
  initialValues,
  userId,
  onCloseModal,
  type,
}) => {
  const { closeModal } = useModal();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const mutationUpdateUser = useUpdateUser();
  const mutationCreateUser = useCreateUser();

  const queryClient = useQueryClient();

  const onUpdate = (values: UserPayload) => {
    if (userId) {
      mutationUpdateUser.mutate(
        { payload: values, id: userId },
        {
          onSuccess: () => {
            message.success({
              content: `Success update user with id ${userId}`,
            });
            queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.USER] });
            closeModal();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const onCreate = (values: UserPayload) => {
    mutationCreateUser.mutate(values, {
      onSuccess: () => {
        message.success({
          content: `Success create user`,
        });
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.USER] });
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.data && Array.isArray(err.response.data)) {
            message.error({
              content: `${err.response.data[0]?.field ?? ""} ${
                err.response.data[0]?.message ??
                "something went wrong, Please try again letter!"
              }`,
            });
          }
        }
      },
    });
  };

  const onSubmit = (values: UserPayload) => {
    if (type === "update") {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
      className="mt-1.5"
    >
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

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
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Gender is required" }]}
      >
        <Select
          placeholder="Select gender"
          options={genderOptions}
          suffixIcon={<MenuDownIcon />}
        />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Status is required" }]}
      >
        <Select
          placeholder="Select status"
          options={statusOptions}
          suffixIcon={<MenuDownIcon />}
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={
            mutationUpdateUser.status === "pending" ||
            mutationCreateUser.status === "pending"
          }
        >
          {type === "create" ? "Create" : "Update"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormUser;
