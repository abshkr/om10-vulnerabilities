import React from "react";
import _ from "lodash";
import { Icon } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, configuration) => {
  const values = defaults(data);
  const config = configuration.columns.physicalPrinters;

  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return modified;
};

const defaults = data => [
  {
    title: "Logical Printer",
    dataIndex: "prntr",
    key: "prntr",
    width: 200,
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "System / Physical Printer",
    dataIndex: "sys_prntr",
    key: "sys_prntr",
    width: 250,
    filters: generate(data, "sys_prntr"),
    onFilter: (value, record) => record.sys_prntr.indexOf(value) === 0
  },
  {
    title: "Lock",
    dataIndex: "prntr_lock",
    key: "prntr_lock",
    width: 150,
    filters: generate(data, "prntr_lock"),
    onFilter: (value, record) => record.prntr_lock.indexOf(value) === 0,
    render: text => (
      <span>
        <Icon type={text === "N" ? "unlock" : "lock"} />
      </span>
    )
  },
  {
    title: "Area Id",
    dataIndex: "prntr_area",
    key: "prntr_area",
    width: 150
  },
  {
    title: "Area Location",
    dataIndex: "area_name",
    key: "area_name",
    width: 200,
    filters: generate(data, "area_name"),
    onFilter: (value, record) => record.area_name.indexOf(value) === 0
  }
];

export default columns;
