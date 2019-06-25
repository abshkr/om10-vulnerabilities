import React from "react";

const columns = [
  {
    title: "Base Product Name",
    dataIndex: "base_name",
    key: "base_name"
  },
  {
    title: "Number Of Tanks",
    dataIndex: "tank_count",
    key: "tank_count"
  },
  {
    title: "Total Capacity",
    dataIndex: "total_capacity",
    key: "total_capacity",
    render: text => <span>{text} ML</span>
  },
  {
    title: "Observed Quantity",
    dataIndex: "observed_quantity",
    key: "observed_quantity",
    render: text => <span>{text} ML</span>
  },
  {
    title: "Ullage",
    dataIndex: "total_ullage",
    key: "total_ullage",
    render: text => <span>{text} ML</span>
  },
  {
    title: "Full",
    dataIndex: "total_fill",
    key: "total_fill",
    render: text => <span>{text} %</span>
  }
];

export default columns;
