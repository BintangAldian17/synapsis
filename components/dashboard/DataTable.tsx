"use client";

import React, { useMemo, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Pagination, Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

type DataTableProps<T extends Record<string, any>> = {
  columns: ColumnsType<T>;
  dataSource: T[];
  total: number;
  loading: boolean;
  onChangePagination: (page: number, limit: number) => void;
};

function DataTable<T extends Record<string, any>>({
  columns,
  dataSource,
  total,
  loading,
  onChangePagination,
}: DataTableProps<T>) {
  const [tableParams, setTableParams] = useState<{
    page: number;
    limit: number;
    sortField?: string;
    sortOrder?: "ascend" | "descend";
  }>({
    page: 1,
    limit: 10,
  });

  const handleTableChange: GetProp<TableProps<T>, "onChange"> = (
    _pagination,
    _filters,
    sorter
  ) => {
    const sortField = (sorter as SorterResult<T>).field as string | undefined;
    const sortOrder = (sorter as SorterResult<T>).order as
      | "ascend"
      | "descend"
      | undefined;

    setTableParams((prev) => ({
      ...prev,
      sortField: sortField || undefined,
      sortOrder: sortOrder || undefined,
      page: 1,
    }));
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setTableParams((prev) => ({
      ...prev,
      page,
      limit: pageSize,
    }));
    onChangePagination(page, pageSize);
  };

  const sortedDataSource = useMemo(() => {
    if (!tableParams.sortField || !dataSource || dataSource.length === 0) {
      return dataSource;
    }

    const dataToSort = [...dataSource];

    dataToSort.sort((a, b) => {
      const field = tableParams.sortField as keyof T;
      const aValue = a[field];
      const bValue = b[field];

      if (aValue === null || aValue === undefined)
        return tableParams.sortOrder === "ascend" ? 1 : -1;
      if (bValue === null || bValue === undefined)
        return tableParams.sortOrder === "ascend" ? -1 : 1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return tableParams.sortOrder === "ascend" ? comparison : -comparison;
      }

      if (aValue < bValue) {
        return tableParams.sortOrder === "ascend" ? -1 : 1;
      }
      if (aValue > bValue) {
        return tableParams.sortOrder === "ascend" ? 1 : -1;
      }
      return 0;
    });

    return dataToSort;
  }, [dataSource, tableParams.sortField, tableParams.sortOrder]);

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <Table<T>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={sortedDataSource}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
        className="!mb-[12px]"
      />
      <Pagination
        style={{
          height: 54,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "end",
        }}
        total={total}
        showTotal={(total, range) => (
          <span className="text-[#7C7C7C]">
            {range[0]}-{range[1]} of {total} items
          </span>
        )}
        current={tableParams.page}
        pageSize={tableParams.limit}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["10", "20", "50", "100"]}
      />
    </div>
  );
}

export default DataTable;
