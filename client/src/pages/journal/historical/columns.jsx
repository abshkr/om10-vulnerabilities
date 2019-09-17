import React from "react";
import _ from "lodash";
import { Tag } from "antd";
import { SYSTEM_COLORS } from "../../../constants";
import { generateOptions, validateDateTime } from "../../../utils";

const columns = (data, configuration) => {
  const values = defaults(data, configuration);
  const config = configuration.columns.journal;
  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return modified;
};

const defaults = (data, config) => [
  {
    title: "Time",
    dataIndex: "gen_date",
    key: "gen_date",
    width: 300,
    align: "center",
    sorter: (a, b) => validateDateTime(b.gen_date) - validateDateTime(a.gen_date),
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Event",
    dataIndex: "msg_event",
    key: "msg_event",
    width: 200,
    align: "center",
    filters: generateOptions(data, "msg_event"),
    onFilter: (value, record) => record.msg_event.indexOf(value) === 0,
    render: text => (
      <span>
        <Tag color={SYSTEM_COLORS[text]}>{text}</Tag>
      </span>
    )
  },
  {
    title: "Details",
    dataIndex: "message",
    key: "message",
    sorter: (a, b) => a.message.localeCompare(b.message)
  }
];

export default columns;
