import React from "react";
import { Tag, Avatar, Progress, Icon } from "antd";
import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Profile",
    dataIndex: "baseName",
    key: "profile",
    width: 220,
    onFilter: (value, record) => record.baseName.indexOf(value) === 0,
    render: (value, record) => <Avatar style={{ backgroundColor: record.baseColor }}>{value.substring(0, 1)}</Avatar>
  },
  {
    title: "Base Product Code",
    dataIndex: "baseCode",
    key: "baseCode",
    width: 250,
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Base Product Name",
    dataIndex: "baseName",
    key: "baseName",
    width: 250,
    filters: generate(data, "baseName"),
    onFilter: (value, record) => record.baseName.indexOf(value) === 0
  },

  {
    title: "Arm Priority",
    dataIndex: "armPriority",
    key: "armPriority",
    filters: generate(data, "armPriority"),
    width: 250,
    onFilter: (value, record) => record.armPriority.indexOf(value) === 0,
    render: priority => (
      <span>
        <Icon type={priority === "High" ? "caret-up" : "caret-down"} style={{ color: priority === "High" ? "#ec6e68" : "#a4ec68" }} />
        {` ${priority}`}
      </span>
    )
  },
  {
    title: "Tanks",
    dataIndex: "tankList",
    key: "tankList",

    render: tanks => (
      <span>
        {tanks.map(tank => (
          <Tag key={tank.tank_code} color={tank.flowing === "Y" ? "green" : "volcano"}>
            {tank.tank_code}
          </Tag>
        ))}
      </span>
    )
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
    width: 150,
    render: activity => <span>{`${activity.current} / ${activity.total} `}</span>
  },

  {
    title: "Total Flow Contribution",
    dataIndex: "flowRate",
    key: "flowRate",
    render: percent => (
      <span>
        <Progress percent={percent} strokeColor="#68a4ec" strokeWidth={6} status="active" />
      </span>
    )
  }
];

export default columns;
