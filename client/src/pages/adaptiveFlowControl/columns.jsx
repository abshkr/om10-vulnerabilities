import React from "react";
import { Tag, Avatar } from "antd";
import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Profile",
    dataIndex: "base_name",
    key: "base_name_1",
    width: 220,
    fixed: "left",
    onFilter: (value, record) => record.base_name.indexOf(value) === 0,
    render: (value, record) => <Avatar style={{ backgroundColor: record.base_color }}>{value.substring(0, 1)}</Avatar>
  },
  {
    title: "Base Product Code",
    dataIndex: "base_code",
    key: "base_code",
    render: text => <Tag className="tag">{text}</Tag>
  },
  {
    title: "Base Product Name",
    dataIndex: "base_name",
    key: "base_name2",
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  },
  {
    title: "Adaptive Flow Control Enabled",
    dataIndex: "afc_enabled",
    key: "afc_enabled",
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  },
  {
    title: "Arm Priority",
    dataIndex: "afc_priority",
    key: "afc_priority",
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  }
];

export default columns;
