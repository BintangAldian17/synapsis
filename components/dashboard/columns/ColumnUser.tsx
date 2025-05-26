import { User } from "@/types/user";
import TableAction from "../TableAction";
import { TableProps } from "antd";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

type GetColumnsUserProps = {
  onClickAction: (actionType: "delete" | "update", record: User) => void;
};

export function getColumnsUser({
  onClickAction,
}: GetColumnsUserProps): ColumnsType<User> {
  return [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      width: "25%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: true,
      width: "15%",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      width: "15%",
      align: "center",
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
