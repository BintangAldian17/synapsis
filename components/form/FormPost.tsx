"use client";

import React, { useMemo, useState } from "react";
import { Form, Input, Select, Button, App } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINT } from "@/libs/services/axios";
import { useModal } from "@/context/ModalContext";
import { PostPayload } from "@/types/post";
import { useCreatePost, useUpdatePost } from "@/libs/api/post/post-query";
import { useDebouncedValue } from "@/libs/hooks/use-debounced-value";
import { useUserById, useUsers } from "@/libs/api/user/user-query";
import { AxiosError } from "axios";
import { MenuDownIcon } from "../icons/MenuDownIcon";

const { TextArea } = Input;

type FormPostProps = {
  initialValues?: PostPayload;
  postId?: number;
  onCloseModal?: () => void;
  type: "create" | "update";
};

const FormPost: React.FC<FormPostProps> = ({
  initialValues,
  postId,
  onCloseModal,
  type,
}) => {
  const { closeModal } = useModal();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [searchName, setSearchName] = useState("");

  const [debouncedSearchName] = useDebouncedValue(searchName, 200);

  const mutationUpdatePost = useUpdatePost();
  const mutationCreatePost = useCreatePost();

  const usersQuery = useUsers({
    page: 1,
    limit: 10,
    name: debouncedSearchName,
  });

  const usersData = usersQuery.data?.data;
  const userId = initialValues?.user_id;
  const { data: userData } = useUserById(userId ?? 0, {
    enabled: !!userId,
  });

  const transformedInitialValues = initialValues
    ? {
        ...initialValues,
        user_id: userData
          ? { value: userData.id, label: userData.name }
          : undefined,
      }
    : {};

  const optionsUsers = useMemo(() => {
    if (usersData && usersData.length > 0) {
      return usersData.map((user) => ({
        value: user.id,
        label: user.name,
      }));
    }
    return [];
  }, [usersData]);

  const queryClient = useQueryClient();

  const onUpdate = (values: PostPayload) => {
    if (postId) {
      mutationUpdatePost.mutate(
        { payload: values, id: postId },
        {
          onSuccess: () => {
            message.success({
              content: `Success update Post with id ${postId}`,
            });
            queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.POST] });
            closeModal();
            onCloseModal?.();
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
        }
      );
    }
  };

  const onCreate = (values: PostPayload) => {
    console.log(values);
    mutationCreatePost.mutate(values, {
      onSuccess: () => {
        message.success({
          content: `Success create post`,
        });
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.POST] });
        closeModal();
        onCloseModal?.();
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

  const onSubmit = (values: PostPayload) => {
    if (type === "update") {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };

  console.log(transformedInitialValues);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={transformedInitialValues}
      onFinish={onSubmit}
      className="mt-1.5"
    >
      <Form.Item
        label="User"
        name="user_id"
        rules={[{ required: true, message: "User is required" }]}
      >
        <Select
          placeholder="Select User"
          showSearch
          allowClear
          labelInValue
          suffixIcon={<MenuDownIcon />}
          onSearch={(value) => setSearchName(value)}
          filterOption={false}
          loading={usersQuery.isLoading}
          options={optionsUsers}
          notFoundContent={
            usersQuery.isLoading ? "Loading..." : "No users found"
          }
        />
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="body"
        rules={[{ required: true, message: "Description is required" }]}
      >
        <TextArea
          autoSize={{
            minRows: type === "create" ? 6 : 3,
            maxRows: type === "create" ? 8 : 5,
          }}
          placeholder="Enter description"
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={mutationUpdatePost.status === "pending"}
        >
          {type === "create" ? "Create" : "Update"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormPost;
