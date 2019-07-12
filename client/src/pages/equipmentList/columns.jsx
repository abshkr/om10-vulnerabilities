import React from "react";
import _ from "lodash";
import moment from "moment";
import { Tag, Icon } from "antd";
import { generateOptions } from "../../utils";

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
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Code",
    dataIndex: "eqpt_code",
    key: "eqpt_code",
    width: 200
  },
  {
    title: "Title",
    dataIndex: "eqpt_title",
    key: "eqpt_title",
    width: 150
  },
  {
    title: "Active Tanker",
    dataIndex: "eqpt_tanker",
    key: "eqpt_tanker",
    width: 150
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
    width: 150
  },
  {
    title: "Locked?",
    dataIndex: "eqpt_lock",
    key: "eqpt_lock",
    width: 80,
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
    render: text => (
      <span>
        <Tag color="blue">{text}</Tag>
      </span>
    )
  },
  {
    title: "Registration Expired",
    dataIndex: "eqpt_exp_d1_dmy",
    key: "eqpt_exp_d1_dmy",
    width: 180
  },
  {
    title: "Prime Mover SLP",
    dataIndex: "eqpt_exp_d2_dmy",
    key: "eqpt_exp_d2_dmy",
    width: 150,
    render: tanks => <span>{tanks}</span>
  },
  {
    title: "Trailer SLP",
    dataIndex: "eqpt_exp_d3_dmy",
    key: "eqpt_exp_d3_dmy",
    width: 180
  },
  {
    title: "Must Tare In?",
    dataIndex: "eqp_must_tare_in",
    key: "eqp_must_tare_in",
    width: 100,
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
    width: 200,
    sorter: (a, b) => moment(b.eqpt_last_modified, config.defaultTimeFormat).valueOf() - moment(a.eqpt_last_modified, config.defaultTimeFormat).valueOf(),
    render: text => <span>{text === "" ? "" : moment(text, config.defaultTimeFormat).format(config.dateTimeFormat)}</span>
  },
  {
    title: "Last Used",
    dataIndex: "eqpt_last_used",
    key: "eqpt_last_used",
    width: 200,
    sorter: (a, b) => moment(b.eqpt_last_used, config.defaultTimeFormat).valueOf() - moment(a.eqpt_last_used, config.defaultTimeFormat).valueOf(),
    render: text => <span>{text === "" ? "" : moment(text, config.defaultTimeFormat).format(config.dateTimeFormat)}</span>
  }
];

export default columns;
