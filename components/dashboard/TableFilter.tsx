import { Flex, Input, Select, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { MenuDownIcon } from "../icons/MenuDownIcon";

const { Text } = Typography;

type FilterOption = {
  value: string;
  label: string;
};

type FilterConfig = {
  key: string;
  placeholder: string;
  options: FilterOption[];
};

interface TableFilterProps {
  searchValue: string;
  onChangeSearch: (value: string) => void;
  onChangeFilter: (filters: Record<string, string>) => void;
  filtersConfig?: FilterConfig[];
  searchPlaceHolder: string;
}

const TableFilter: React.FC<TableFilterProps> = ({
  searchValue,
  onChangeSearch,
  onChangeFilter,
  filtersConfig,
  searchPlaceHolder,
}) => {
  const handleSelectChange = (key: string, value: string) => {
    onChangeFilter({ [key]: value });
  };

  const isFilterConfigExist = filtersConfig && filtersConfig.length > 0;

  return (
    <Flex
      align="center"
      justify={isFilterConfigExist ? "space-between" : "end"}
      className="!p-sm"
    >
      <Flex align="center" gap={8}>
        {isFilterConfigExist && (
          <Text strong className="text-text">
            Filter
          </Text>
        )}

        {isFilterConfigExist &&
          filtersConfig.map((filter) => (
            <Select
              key={filter.key}
              optionLabelProp="label"
              placeholder={filter.placeholder}
              suffixIcon={<MenuDownIcon />}
              labelRender={({ label }) => (
                <span className="bg-[#EEEEEE] !py-[2px] !px-[5px] text-sm rounded-md">
                  {label}
                </span>
              )}
              style={{ width: 128 }}
              onChange={(val) => handleSelectChange(filter.key, val)}
              options={filter.options}
            />
          ))}
      </Flex>

      <Input
        placeholder={searchPlaceHolder}
        onChange={(e) => onChangeSearch(e.target.value)}
        value={searchValue}
        prefix={<SearchOutlined />}
        style={{ width: 240, height: 40 }}
        className="!placeholder:text-[5px]"
      />
    </Flex>
  );
};

export default TableFilter;
