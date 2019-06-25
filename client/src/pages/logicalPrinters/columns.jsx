import React from "react";
import _ from "lodash";
import { Tag } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, configuration) => {
  const values = defaults(data);
  const config = configuration.columns.logicalPrinters;

  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return modified;
};

const defaults = data => [
  {
    title: "Company Code",
    dataIndex: "prt_cmpy",
    key: "prt_cmpy",
    width: 200,
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Company",
    dataIndex: "prt_cmpy_name",
    key: "prt_cmpy_name",
    width: 250,
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  },
  {
    title: "Usage Id",
    dataIndex: "prt_usage",
    key: "prt_usage",
    width: 150,
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  },
  {
    title: "Usage",
    dataIndex: "prt_usage_name",
    key: "base_prt_usage_namecprt_usage_nameat",
    width: 150,
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0,
    render: data => <Tag color="blue">{data}</Tag>
  },
  {
    title: "Printer",
    dataIndex: "prt_printer",
    key: "prt_printer",
    width: 200
  },
  {
    title: "System / Physical Printer",
    dataIndex: "sys_printer",
    key: "sys_printer",
    width: 200
  },
  {
    title: "Area Id",
    dataIndex: "prt_area",
    key: "prt_area",
    width: 200
  },
  {
    title: "Area Location",
    dataIndex: "area_name",
    key: "area_name",
    width: 150,
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  }
];

export default columns;
