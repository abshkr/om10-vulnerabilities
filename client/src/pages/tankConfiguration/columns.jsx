import React from "react";
import _ from "lodash";
import { Tag } from "antd";
import { generateOptions } from "../../utils";

const columns = (data, configuration) => {
  const values = defaults(data);
  const config = configuration.columns.tankConfigurations;
  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return modified;
};

const defaults = data => [
  {
    title: "Tank Code",
    dataIndex: "tank_code",
    key: "tank_code",
    align: "center",
    fixed: "left",
    sorter: (a, b) => b.tank_code - a.tank_code,
    // eslint-disable-next-line
    render: text => <a href="#">{text}</a>
  },
  {
    title: "Tank Name",
    dataIndex: "tank_name",
    key: "tank_name",
    width: 200,
    filters: generateOptions(data, "tank_name"),
    onFilter: (value, record) => record.tank_name.indexOf(value) === 0
  },
  {
    title: "Product Code",
    dataIndex: "tank_base",
    key: "tank_base",
    filters: generateOptions(data, "tank_base"),
    onFilter: (value, record) => record.tank_base.indexOf(value) === 0,
    width: 200
  },
  {
    title: "Product Name",
    dataIndex: "tank_base_name",
    key: "tank_base_name",
    filters: generateOptions(data, "tank_base_name"),
    onFilter: (value, record) => record.tank_base_name.indexOf(value) === 0,
    width: 200
  },
  {
    title: "Product Category",
    dataIndex: "tank_bclass_name",
    key: "tank_bclass_name",
    filters: generateOptions(data, "tank_bclass_name"),
    onFilter: (value, record) => record.tank_bclass_name.indexOf(value) === 0,
    width: 300
  },
  {
    title: "Density",
    dataIndex: "tank_density",
    key: "tank_density",
    align: "center",
    sorter: (a, b) => a.tank_density - b.tank_density,
    sortDirections: ["descend", "ascend"],
    width: 150,
    render: text => <span>{text === "" ? `${text}` : `${text} kg/m3`}</span>
  },
  {
    title: "Daily Variance Limit",
    dataIndex: "tank_dtol_volume",
    key: "tank_dtol_volume",
    align: "center",
    sorter: (a, b) => a.tank_dtol_volume - b.tank_dtol_volume,
    sortDirections: ["descend", "ascend"],
    width: 200,
    render: text => <span>{text === "" ? `${text}` : `${text} Vol`}</span>
  },
  {
    title: "Daily Variance Limit",
    dataIndex: "tank_dtol_percent",
    key: "tank_dtol_percent",
    align: "center",
    sorter: (a, b) => a.tank_dtol_percent - b.tank_dtol_percent,
    sortDirections: ["descend", "ascend"],
    width: 200,
    render: text => <span>{text === "" ? `${text}` : `${text} %`}</span>
  },
  {
    title: "Monthly Variance Limit",
    dataIndex: "tank_mtol_volume",
    key: "tank_mtol_volume",
    align: "center",
    sorter: (a, b) => a.tank_mtol_volume - b.tank_mtol_volume,
    sortDirections: ["descend", "ascend"],
    width: 200,
    render: text => <span>{text === "" ? `${text}` : `${text} Vol`}</span>
  },
  {
    title: "Monthly Variance Limit",
    dataIndex: "tank_mtol_percent",
    key: "tank_mtol_percent",
    align: "center",
    sorter: (a, b) => a.tank_mtol_percent - b.tank_mtol_percent,
    sortDirections: ["descend", "ascend"],
    width: 200,
    render: text => <span>{text === "" ? `${text}` : `${text} %`}</span>
  },
  {
    title: "Adaptive Arm Priority",
    dataIndex: "tank_afc_priority",
    key: "tank_afc_priority",
    width: 250,
    render: text => <span>{text}</span>
  },

  {
    title: "Flow Rates",
    dataIndex: "tank_max_flow",
    width: 400,
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
