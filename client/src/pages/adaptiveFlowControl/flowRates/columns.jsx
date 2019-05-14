import React from "react";
import { Badge } from "antd";
import TextyAnim from "rc-texty";

const columns = [
  {
    title: "Active Tank",
    dataIndex: "tank_code",
    key: "active_tank",
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  { title: "Bay", dataIndex: "bad_physcode", key: "bay" },
  { title: "Arm", dataIndex: "baa_code", key: "arm" },
  {
    title: "Flowing",
    key: "flowing",
    dataIndex: "flowing",
    render: flowing => (
      <span>
        <Badge status={flowing === "Y" ? "processing" : "warning"} />
        {flowing === "Y" ? "Active" : "Inactive"}
      </span>
    )
  },

  {
    title: "Limiting",
    key: "high_flow_state",
    dataIndex: "high_flow_state",
    render: state => (
      <span>
        <Badge status={state === "0" ? "warning" : "processing"} />
        {state === "0" ? "Inactive" : state}
      </span>
    )
  },

  {
    title: "Flow Contribution (LPM)",
    dataIndex: "flow_contribution",
    key: "flow_contribution",
    render: value => (
      <span>
        <TextyAnim type="top" mode="random">
          {value}
        </TextyAnim>
      </span>
    )
  },

  {
    title: "Actual Flowrate (LPM)",
    key: "current_flow_rate",
    dataIndex: "current_flow_rate",
    render: value => (
      <span>
        <TextyAnim type="top" mode="random">
          {value}
        </TextyAnim>
      </span>
    )
  },
  {
    title: "Loaded Quantity",
    dataIndex: "loaded_qty",
    key: "loaded_qty",
    render: value => (
      <span>
        <TextyAnim type="top" mode="random">
          {value}
        </TextyAnim>
      </span>
    )
  }
];

export default columns;
