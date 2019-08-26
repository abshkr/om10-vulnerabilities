import React from "react";
import { Icon } from "antd";

const columns = t => [
  {
    title: t("fields.compartment"),
    dataIndex: "cmpt_no",
    key: "cmpt_no",
    width: 250
  },
  {
    title: t("fields.safeFill"),
    dataIndex: "safefill",
    key: "safefill",
    width: 300
  },
  {
    title: t("fields.safeFillUnit"),
    dataIndex: "cmpt_units",
    key: "cmpt_units",
    width: 300
  },
  {
    title: t("fields.capacity"),
    dataIndex: "sfl",
    key: "sfl",
    width: 300
  },
  {
    title: t("fields.status"),
    dataIndex: "adj_cmpt_lock",
    key: "adj_cmpt_lock",
    width: 300,
    editable: true,
    render: text => (
      <span>
        <Icon type={text ? "lock" : "unlock"} />
      </span>
    )
  }
];

export default columns;
