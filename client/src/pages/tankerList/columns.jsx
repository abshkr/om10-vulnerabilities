import React from "react";
import { Icon } from "antd";
import {
  generateOptions,
  validateDateTime,
  convertToLocale
} from "../../utils";

const columns = (data, config) => [
  {
    title: "Code",
    dataIndex: "tnkr_code",
    key: "tnkr_code",
    width: 100,
    align: "center",
    onFilter: (value, record) => record.tnkr_code.indexOf(value) === 0,
    sorter: (a, b) => a.tnkr_code.localeCompare(b.tnkr_code),
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Name",
    dataIndex: "tnkr_name",
    key: "eqpt_code",
    onFilter: (value, record) => record.tnkr_name.indexOf(value) === 0,
    sorter: (a, b) => a.tnkr_name.localeCompare(b.tnkr_name),
    width: 200
  },
  {
    title: "Carrier",
    dataIndex: "tnkr_carrier_name",
    key: "tnkr_carrier_name",
    onFilter: (value, record) => record.tnkr_carrier_name.indexOf(value) === 0,
    sorter: (a, b) => a.tnkr_carrier_name.localeCompare(b.tnkr_carrier_name),
    width: 200
  },
  {
    title: "Owner",
    dataIndex: "tnkr_owner_name",
    key: "tnkr_owner_name",
    onFilter: (value, record) => record.tnkr_owner_name.indexOf(value) === 0,
    sorter: (a, b) => a.tnkr_owner_name.localeCompare(b.tnkr_owner_name),
    width: 200
  },
  {
    title: "Equipment Type",
    dataIndex: "tnkr_eqpt_name",
    key: "tnkr_eqpt_name",
    width: 350,
    filters: generateOptions(data, "tnkr_eqpt_name"),
    onFilter: (value, record) => record.tnkr_eqpt_name.indexOf(value) === 0
  },
  {
    title: "Base Depot",
    dataIndex: "tnkr_base_site_name",
    key: "tnkr_base_site_name",
    filters: generateOptions(data, "tnkr_base_site_name"),
    width: 150
  },
  {
    title: "Locked?",
    dataIndex: "tnkr_lock",
    key: "tnkr_lock",
    align: "center",
    width: 60,
    render: text => (
      <span>
        <Icon type={text === "Y" ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: "Active?",
    dataIndex: "tnkr_active",
    key: "tnkr_active",
    align: "center",
    width: 60,
    render: text => (
      <span>
        <Icon type={text === "Y" ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: "Bay Check?",
    dataIndex: "tnkr_bay_loop_ch",
    key: "tnkr_bay_loop_ch",
    align: "center",
    width: 60,
    render: text => (
      <span>
        <Icon type={text === "Y" ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: "Archived?",
    dataIndex: "tnkr_archive",
    key: "tnkr_archive",
    align: "center",
    width: 60,
    render: text => (
      <span>
        <Icon type={text === "Y" ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: "Last Modified",
    dataIndex: "tnkr_last_modified",
    key: "tnkr_last_modified",
    align: "center",
    width: 250,
    sorter: (a, b) =>
      validateDateTime(b.tnkr_last_modified) -
      validateDateTime(a.tnkr_last_modified),
    render: text => <span>{convertToLocale(text)}</span>
  },
  {
    title: "Last Used",
    dataIndex: "tnkr_last_used",
    key: "tnkr_last_used",
    align: "center",
    width: 250,
    sorter: (a, b) =>
      validateDateTime(b.tnkr_last_used) - validateDateTime(a.tnkr_last_used),

    render: text => <span>{convertToLocale(text)}</span>
  }
];

export default columns;
