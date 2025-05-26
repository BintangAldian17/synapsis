"use client";

import { Space, Tabs, TabsProps, Divider, App } from "antd";
import React, { useState } from "react";
import DataTable from "./DataTable";
import TableFilter from "./TableFilter";
import { useDeleteUser, useUsers } from "@/libs/api/user/user-query";
import { useDebouncedValue } from "@/libs/hooks/use-debounced-value";
import { useDeletePost, usePosts } from "@/libs/api/post/post-query";
import { getColumnsPost } from "./columns/ColumnPost";
import { Gender, Status, User } from "@/types/user";
import { getColumnsUser } from "./columns/ColumnUser";
import ModalForm from "./Modal";
import { useModal } from "@/context/ModalContext";
import FormUser from "../form/FormUser";
import FormPost from "../form/FormPost";
import { Post } from "@/types/post";
import { useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINT } from "@/libs/services/axios";

export type TableType = "user" | "post";

const filterConfigsUser = [
  {
    key: "gender",
    placeholder: "Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    key: "status",
    placeholder: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
];

const Table = () => {
  const { message } = App.useApp();
  const [activeTab, setActiveTab] = useState<TableType>("user");
  const [searchName, setSearchName] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [filter, setFilter] = useState<{ gender?: Gender; status?: Status }>(
    {}
  );
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [recordUser, setRecordUser] = useState<User | null>(null);
  const [recordPost, setRecordPost] = useState<Post | null>(null);
  const [titleModal, setTitleModal] = useState("");

  const { isModalOpen, closeModal } = useModal();

  const [debouncedSearchName] = useDebouncedValue(searchName, 200);
  const [debouncedSearchTitle] = useDebouncedValue(searchTitle, 200);

  const mutationDeleteUser = useDeleteUser();
  const mutationDeletePost = useDeletePost();
  const queryClient = useQueryClient();

  const handleCloseModal = () => {
    closeModal();
    setTitleModal("");
    setRecordPost(null);
    setRecordUser(null);
  };

  const handleChangePagination = (page: number, limit: number) => {
    setPagination((prev) => ({ ...prev, page, limit }));
  };

  const handleDeleteUser = (recordId: number) => {
    mutationDeleteUser.mutate(recordId, {
      onSuccess: () => {
        message.success({
          content: `Success delete user with id ${recordId}`,
        });
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.USER] });
      },
    });
  };
  const handleDeletePost = (recordId: number) => {
    mutationDeletePost.mutate(recordId, {
      onSuccess: () => {
        message.success({
          content: `Success delete post with id ${recordId}`,
        });
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.POST] });
      },
    });
  };

  const columnsUser = getColumnsUser({
    onClickAction: (actionType, record) => {
      if (actionType === "update") {
        setRecordUser(record);
        setTitleModal(`Update ${record.id} - ${record.name}`);
      } else {
        handleDeleteUser(record.id);
      }
    },
  });

  const columnsPost = getColumnsPost({
    onClickAction: (actionType, record) => {
      if (actionType === "update") {
        setRecordPost(record);
        setTitleModal(`Update ${record.id}`);
      } else {
        handleDeletePost(record.id);
      }
    },
  });

  const usersQuery = useUsers(
    {
      ...pagination,
      ...filter,
      name: debouncedSearchName,
    },
    {
      enabled: activeTab === "user",
    }
  );

  const postQuery = usePosts(
    {
      ...pagination,
      title: debouncedSearchTitle,
    },
    {
      enabled: activeTab === "post",
    }
  );

  const handleSearchName = (value: string) => {
    setSearchName(value);
  };

  const handleSearchTitle = (value: string) => {
    setSearchTitle(value);
  };

  const handleFilterChange = (filters: {
    gender?: Gender;
    status?: Status;
  }) => {
    setFilter(filters);
  };

  const onTabChange = (key: string) => {
    setActiveTab(key as TableType);
    setSearchName("");
    setSearchTitle("");
  };

  const items: TabsProps["items"] = [
    {
      key: "user",
      label: "User",
      children: (
        <>
          <TableFilter
            searchPlaceHolder="Search Name"
            filtersConfig={filterConfigsUser}
            onChangeSearch={handleSearchName}
            searchValue={searchName}
            onChangeFilter={handleFilterChange}
          />
          <Divider />
          <DataTable
            onChangePagination={handleChangePagination}
            columns={columnsUser}
            dataSource={usersQuery.data?.data || []}
            total={usersQuery.data?.meta.total || 0}
            loading={usersQuery.status == "pending"}
          />
        </>
      ),
    },
    {
      key: "post",
      label: "Post",
      children: (
        <>
          <TableFilter
            searchPlaceHolder="Search Title"
            onChangeSearch={handleSearchTitle}
            searchValue={searchTitle}
            onChangeFilter={handleFilterChange}
          />
          <Divider />
          <DataTable
            onChangePagination={handleChangePagination}
            columns={columnsPost}
            dataSource={postQuery.data?.data || []}
            total={postQuery.data?.meta.total || 0}
            loading={postQuery.status === "pending"}
          />
        </>
      ),
    },
  ];

  return (
    <div className="px-[32px]">
      <Space direction="vertical" size={16} className="w-full">
        <Tabs
          defaultActiveKey="user"
          items={items}
          onChange={onTabChange}
          className="!m-0"
        />
      </Space>
      <ModalForm
        isOpenModal={isModalOpen}
        onCancel={handleCloseModal}
        title={titleModal}
      >
        {activeTab === "user" && recordUser !== null && (
          <FormUser
            type="update"
            onCloseModal={handleCloseModal}
            userId={recordUser.id}
            initialValues={recordUser}
            key={recordUser.id}
          />
        )}

        {activeTab === "post" && recordPost && (
          <FormPost
            type="update"
            onCloseModal={handleCloseModal}
            postId={recordPost.id}
            initialValues={recordPost}
            key={recordPost.id}
          />
        )}
      </ModalForm>
    </div>
  );
};

export default Table;
