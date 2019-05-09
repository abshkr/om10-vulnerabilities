import React from "react";
import { Tag } from "antd";

import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Tank Code",
    dataIndex: "tank_code",
    key: "tank_code",
    fixed: "left",
    render: text => <Tag className="tag">{text}</Tag>
  },
  {
    title: "Tank Name",
    dataIndex: "tank_name",
    key: "tank_name",
    width: 300,
    filters: generate(data, "tank_name"),
    onFilter: (value, record) => record.tank_name.indexOf(value) === 0
  },
  {
    title: "Terminal",
    dataIndex: "tank_terminal",
    key: "tank_terminal",
    filters: generate(data, "tank_terminal"),
    onFilter: (value, record) => record.tank_terminal.indexOf(value) === 0,
    width: 300
  },
  {
    title: "Product Code",
    dataIndex: "tank_base",
    key: "tank_base",
    filters: generate(data, "tank_base"),
    onFilter: (value, record) => record.tank_base.indexOf(value) === 0,
    width: 300
  },
  {
    title: "Product Name",
    dataIndex: "tank_base_name",
    key: "tank_base_name",
    filters: generate(data, "tank_base_name"),
    onFilter: (value, record) => record.tank_base_name.indexOf(value) === 0,
    width: 300
  },
  {
    title: "Product Category",
    dataIndex: "tank_bclass_name",
    key: "tank_bclass_name",
    filters: generate(data, "tank_bclass_name"),
    onFilter: (value, record) => record.tank_bclass_name.indexOf(value) === 0,
    width: 300
  },
  {
    title: "Density [kg/m3]",
    dataIndex: "tank_density",
    key: "tank_density",
    sorter: (a, b) => a.tank_density - b.tank_density,
    sortDirections: ["descend", "ascend"],
    width: 300
  },
  {
    title: "Daily Variance Limit (Vol)",
    dataIndex: "tank_dtol_volume",
    key: "tank_dtol_volume",
    sorter: (a, b) => a.tank_dtol_volume - b.tank_dtol_volume,
    sortDirections: ["descend", "ascend"],
    width: 400
  },
  {
    title: "Daily Variance Limit (%)",
    dataIndex: "tank_dtol_percent",
    key: "tank_dtol_percent",
    sorter: (a, b) => a.tank_dtol_percent - b.tank_dtol_percent,
    sortDirections: ["descend", "ascend"],
    width: 400
  },
  {
    title: "Monthly Variance Limit (Vol)",
    dataIndex: "tank_mtol_volume",
    key: "tank_mtol_volume",
    sorter: (a, b) => a.tank_mtol_volume - b.tank_mtol_volume,
    sortDirections: ["descend", "ascend"],
    width: 400
  },
  {
    title: "Monthly Variance Limit (%)",
    dataIndex: "tank_mtol_percent",
    key: "tank_mtol_percent",
    sorter: (a, b) => a.tank_mtol_percent - b.tank_mtol_percent,
    sortDirections: ["descend", "ascend"],
    width: 400
  },
  {
    title: "Maximum Flow Rate",
    dataIndex: "max_allowable_flow_rate",
    key: "max_allowable_flow_rate",
    width: 400
  },
  {
    title: "Adaptive Arm Priority",
    dataIndex: "arm_priority",
    key: "arm_priority",
    width: 350
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
    width: 100
  },
  {
    title: "Flow Rate",
    dataIndex: "flow_rate",
    key: "flow_rate",
    width: 100
  }
];

export default columns;
