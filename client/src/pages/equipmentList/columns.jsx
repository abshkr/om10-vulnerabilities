import React from "react";
import _ from "lodash";
import moment from "moment";
import { Tag, Icon } from "antd";
import { generateOptions, validateDateTime } from "../../utils";

const columns = (data, configuration) => {
  const values = defaults(data, configuration);
  const config = configuration.columns.equipmentList;
  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return modified;
};

const defaults = (data, config) => [
  {
    title: "Id",
    dataIndex: "eqpt_id",
    key: "eqpt_id",
    width: 100,
    onFilter: (value, record) => record.eqpt_id.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_id.localeCompare(b.eqpt_id),
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Code",
    dataIndex: "eqpt_code",
    key: "eqpt_code",
    onFilter: (value, record) => record.eqpt_code.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_code.localeCompare(b.eqpt_code),
    width: 200
  },
  {
    title: "Title",
    dataIndex: "eqpt_title",
    key: "eqpt_title",
    onFilter: (value, record) => record.eqpt_title.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_title.localeCompare(b.eqpt_title),
    width: 200
  },
  {
    title: "Active Tanker",
    dataIndex: "eqpt_tanker",
    key: "eqpt_tanker",
    onFilter: (value, record) => record.eqpt_tanker.indexOf(value) === 0,
    sorter: (a, b) => a.eqpt_tanker.localeCompare(b.eqpt_tanker),
    width: 200
  },
  {
    title: "Owner",
    dataIndex: "eqpt_owner_name",
    key: "eqpt_owner_name",
    width: 350,
    filters: generateOptions(data, "eqpt_owner_name"),
    onFilter: (value, record) => record.eqpt_owner_name.indexOf(value) === 0
  },
  {
    title: "Equipment Type",
    dataIndex: "eqpt_etp_title",
    key: "eqpt_etp_title",
    filters: generateOptions(data, "eqpt_etp_title"),
    width: 150
  },
  {
    title: "Locked?",
    dataIndex: "eqpt_lock",
    key: "eqpt_lock",
    width: 60,
    render: text => (
      <span>
        <Icon type={text === "Y" ? "lock" : "unlock"} />
      </span>
    )
  },
  {
    title: "Load Type",
    dataIndex: "eqpt_load_type_name",
    key: "eqpt_load_type_name",
    width: 80,
    filters: generateOptions(data, "eqpt_load_type_name"),
    render: text => (
      <span>
        <Tag color="blue">{text}</Tag>
      </span>
    )
  },
  {
    title: "Must Tare In?",
    dataIndex: "eqp_must_tare_in",
    key: "eqp_must_tare_in",
    onFilter: (value, record) => record.eqp_must_tare_in.indexOf(value) === 0,
    sorter: (a, b) => a.eqp_must_tare_in.localeCompare(b.eqp_must_tare_in),
    width: 150,
    render: text => (
      <span>
        <Icon type={text === "N" ? "close" : "check"} style={{ color: text === "N" ? "#ec6e68" : "#a4ec68" }} />
      </span>
    )
  },
  {
    title: "Last Modified",
    dataIndex: "eqpt_last_modified",
    key: "eqpt_last_modified",
    width: 250,
    sorter: (a, b) => validateDateTime(b.eqpt_last_modified) - validateDateTime(a.eqpt_last_modified),
    // eslint-disable-next-line
    render: text => <a>{text !== "" ? moment(text, "YYYY-MM-DD HH:mm:ss:SSSS").format(config.dateTimeFormat) : ""}</a>
  },
  {
    title: "Last Used",
    dataIndex: "eqpt_last_used",
    key: "eqpt_last_used",
    width: 250,
    sorter: (a, b) => validateDateTime(b.eqpt_last_used) - validateDateTime(a.eqpt_last_used),
    // eslint-disable-next-line
    render: text => <a>{text !== "" ? moment(text, "YYYY-MM-DD HH:mm:ss:SSSS").format(config.dateTimeFormat) : ""}</a>
  }
];

export default columns;
