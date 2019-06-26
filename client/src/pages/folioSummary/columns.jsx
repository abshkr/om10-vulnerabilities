import React from "react";
import _ from "lodash";
import { Tag } from "antd";
import moment from "moment";
import { generateOptions } from "../../utils";

const columns = (data, configuration) => {
  const values = defaults(data, configuration);
  const config = configuration.columns.folioSummary;
  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return modified;
};

const defaults = (data, config) => [
  {
    title: "ID",
    dataIndex: "closeout_nr",
    key: "closeout_nr",
    width: 200,
    sorter: (a, b) => b.closeout_nr - a.closeout_nr,
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Folio Name",
    dataIndex: "closeout_name",
    key: "closeout_name",
    sorter: (a, b) => b.closeout_name - a.closeout_name,
    width: 200
  },
  {
    title: "Opening Date",
    dataIndex: "prev_closeout_date",
    key: "prev_closeout_date",
    width: 200,
    sorter: (a, b) => moment(b.prev_closeout_date, config.defaultTimeFormat).valueOf() - moment(a.prev_closeout_date, config.defaultTimeFormat).valueOf(),
    render: text => moment(text, config.defaultTimeFormat).format(config.dateTimeFormat)
  },
  {
    title: "Freeze Date",
    dataIndex: "closeout_date",
    key: "closeout_date",
    width: 200,
    sorter: (a, b) => moment(b.closeout_date, config.defaultTimeFormat).valueOf() - moment(a.closeout_date, config.defaultTimeFormat).valueOf(),
    render: text => <span>{text === "" ? "-" : moment(text, config.defaultTimeFormat).format(config.dateTimeFormat)}</span>
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 200,
    filters: generateOptions(data, "status"),
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: text => (
      <span>
        <Tag color={text === 0 ? "green" : "blue"}> {text === 0 ? "Open" : "Frozen"}</Tag>
      </span>
    )
  },
  {
    title: "User",
    dataIndex: "user_code",
    width: 300,
    key: "user_code",
    filters: generateOptions(data, "user_code"),
    onFilter: (value, record) => record.user_code.indexOf(value) === 0
  },
  {
    title: "Date Changed",
    dataIndex: "last_chg_time",
    width: 200,
    key: "last_chg_time",
    sorter: (a, b) => moment(b.last_chg_time, config.defaultTimeFormat).valueOf() - moment(a.last_chg_time, config.defaultTimeFormat).valueOf(),
    render: text => moment(text, config.defaultTimeFormat).format(config.dateTimeFormat)
  }
];

export default columns;
