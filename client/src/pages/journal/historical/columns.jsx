import React from "react";
import _ from "lodash";
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
    sorter: (a, b) => validateDateTime(b.gen_date) - validateDateTime(a.gen_date),
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Event",
    dataIndex: "msg_event",
    key: "msg_event",
    width: 200,
    filters: generateOptions(data, "msg_event"),
    onFilter: (value, record) => record.msg_event.indexOf(value) === 0
  },
  {
    title: "Details",
    dataIndex: "message",
    key: "message",
    sorter: (a, b) => a.message.localeCompare(b.message)
  }
];

export default columns;
