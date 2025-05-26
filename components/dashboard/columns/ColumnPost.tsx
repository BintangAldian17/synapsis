import { Post } from "@/types/post";
import { TableProps } from "antd";
import TableAction from "../TableAction";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

type GetColumnsPostProps = {
  onClickAction: (actionType: "delete" | "update", record: Post) => void;
};

export function getColumnsPost({
  onClickAction,
}: GetColumnsPostProps): ColumnsType<Post> {
  return [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      width: "10%",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      sorter: true,
      width: "15%",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
      width: "30%",
    },
    {
      title: "Body",
      dataIndex: "body",
      width: "30%",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "15%",
      align: "center",
      render(value, record) {
        return (
          <TableAction onClickAction={(type) => onClickAction(type, record)} />
        );
      },
    },
  ];
}
