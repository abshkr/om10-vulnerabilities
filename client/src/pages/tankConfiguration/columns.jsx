import React from "react";
import _ from "lodash";
import { Tag } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, configuration) => {
  const values = defaults(data);

  if (!configuration.features.adaptiveFlowControl) {
    const modified = _.reject(values, o => {
      return o.dataIndex === "tank_max_flow" || o.dataIndex === "tank_afc_priority";
    });
    return modified;
  } else {
    return values;
  }
};

const defaults = data => [
  {
    title: "Tank Code",
    dataIndex: "tank_code",
    key: "tank_code",
    fixed: "left",
    // eslint-disable-next-line
    render: text => <a href="#">{text}</a>
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
    width: 350
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
    width: 450
  },
  {
    title: "Density",
    dataIndex: "tank_density",
    key: "tank_density",
    sorter: (a, b) => a.tank_density - b.tank_density,
    sortDirections: ["descend", "ascend"],
    width: 300,
    render: text => <span>{text === "" ? `${text}` : `${text} kg/m3`}</span>
  },
  {
    title: "Daily Variance Limit",
    dataIndex: "tank_dtol_volume",
    key: "tank_dtol_volume",
    sorter: (a, b) => a.tank_dtol_volume - b.tank_dtol_volume,
    sortDirections: ["descend", "ascend"],
    width: 400,
    render: text => <span>{text === "" ? `${text}` : `${text} Vol`}</span>
  },
  {
    title: "Daily Variance Limit",
    dataIndex: "tank_dtol_percent",
    key: "tank_dtol_percent",
    sorter: (a, b) => a.tank_dtol_percent - b.tank_dtol_percent,
    sortDirections: ["descend", "ascend"],
    width: 400,
    render: text => <span>{text === "" ? `${text}` : `${text} %`}</span>
  },
  {
    title: "Monthly Variance Limit",
    dataIndex: "tank_mtol_volume",
    key: "tank_mtol_volume",
    sorter: (a, b) => a.tank_mtol_volume - b.tank_mtol_volume,
    sortDirections: ["descend", "ascend"],
    width: 450,
    render: text => <span>{text === "" ? `${text}` : `${text} Vol`}</span>
  },
  {
    title: "Monthly Variance Limit",
    dataIndex: "tank_mtol_percent",
    key: "tank_mtol_percent",
    sorter: (a, b) => a.tank_mtol_percent - b.tank_mtol_percent,
    sortDirections: ["descend", "ascend"],
    width: 450,
    render: text => <span>{text === "" ? `${text}` : `${text} %`}</span>
  },
  {
    title: "Adaptive Arm Priority",
    dataIndex: "tank_afc_priority",
    key: "tank_afc_priority",
    width: 350,
    render: text => <span>{text}</span>
  },

  {
    title: "Flow Rates",
    dataIndex: "tank_max_flow",
    width: 600,
    render: levels => (
      <span>
        {levels.map(levels => (
          <Tag key={levels.id} color="green">
            {levels.flow_rate}
          </Tag>
        ))}
      </span>
    )
  }
];
export default columns;
