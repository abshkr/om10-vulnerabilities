import React from "react";
import { generateOptions } from "../../../../utils";

const columns = data => [
  {
    title: "Id",
    dataIndex: "eqpt_id",
    key: "eqpt_id",
    align: "center",
    onFilter: (value, record) => record.eqpt_id.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_id.localeCompare(b.eqpt_id),
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Code",
    dataIndex: "eqpt_code",
    key: "eqpt_code",
    align: "center",
    onFilter: (value, record) => record.eqpt_code.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_code.localeCompare(b.eqpt_code)
  },
  {
    title: "Title",
    dataIndex: "eqpt_title",
    key: "eqpt_title",
    align: "center",
    onFilter: (value, record) => record.eqpt_title.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_title.localeCompare(b.eqpt_title)
  },
  {
    title: "Active Tanker",
    dataIndex: "eqpt_tanker",
    key: "eqpt_tanker",
    align: "center",
    onFilter: (value, record) => record.eqpt_tanker.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_tanker.localeCompare(b.eqpt_tanker)
  },
  {
    title: "Owner",
    dataIndex: "eqpt_owner_name",
    key: "eqpt_owner_name",
    align: "center",
    width: 250,
    filters: generateOptions(data, "eqpt_owner_name"),
    onFilter: (value, record) => record.eqpt_owner_name.indexOf(value) === 0
  }
];

export default columns;
