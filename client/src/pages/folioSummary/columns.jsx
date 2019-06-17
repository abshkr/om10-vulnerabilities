import React from "react";
import _ from "lodash";
import { Tag } from "antd";

const columns = (data, configuration) => {
  const values = defaults(data);

  if (!configuration.features.adaptiveFlowControl) {
    const modified = _.reject(values, o => {
      return o.dataIndex === "tank_max_flow" || o.dataIndex === "tank_afc_priority";
    });
    return modified;
  } else {
    return values;
  }
};

const defaults = data => [
  {
    title: "ID",
    dataIndex: "closeout_nr",
    key: "closeout_nr",
    width: 200,
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Folio Name",
    dataIndex: "closeout_name",
    key: "closeout_name",
    width: 200
  },
  {
    title: "Opening Date",
    dataIndex: "prev_closeout_date",
    key: "prev_closeout_date",
    width: 200
  },
  {
    title: "Freeze Date",
    dataIndex: "closeout_date",
    key: "closeout_date",
    width: 200
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 200,
    render: text => (
      <span>
        <Tag color={text === 0 ? "green" : "blue"}> {text === 0 ? "Open" : "Frozen"}</Tag>
      </span>
    )
  },
  {
    title: "Reports",
    dataIndex: "base_prod_group",
    width: 200,
    key: "base_prod_group"
  },
  {
    title: "User",
    dataIndex: "user_code",
    width: 300,
    key: "user_code"
  },
  {
    title: "Date Changed",
    dataIndex: "last_chg_time",
    width: 200,
    key: "last_chg_time"
  }
];

export default columns;
