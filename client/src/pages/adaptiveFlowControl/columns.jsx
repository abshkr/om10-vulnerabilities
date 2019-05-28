import React from "react";
import _ from "lodash";
import { Tag, Avatar, Progress } from "antd";
import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Profile",
    dataIndex: "baseName",
    key: "profile",
    width: 180,
    onFilter: (value, record) => record.baseName.indexOf(value) === 0,
    render: (value, record) => <Avatar style={{ backgroundColor: record.baseColor }}>{value.substring(0, 1)}</Avatar>
  },
  {
    title: "Base Product Code",
    dataIndex: "baseCode",
    key: "baseCode",
    width: 200,
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
    onFilter: (value, record) => record.armPriority.indexOf(value) === 0
  },
  {
    title: "Tanks",
    dataIndex: "tankList",
    key: "tankList",

    render: tanks => (
      <span>
        {_.uniqBy(tanks, "tank_code").map(tank => (
          <Tag key={tank.tank_code} color={tank.flowing === "Y" ? "green" : "volcano"}>
            {tank.tank_code}
          </Tag>
        ))}
      </span>
    )
  },
  {
    title: "Total Flow Contribution",
    dataIndex: "flowRate",
    key: "flowRate",
    render: percent => (
      <div style={{ display: "flex", flexDirection: "column", width: "95%" }}>
        <Progress percent={percent} strokeColor="#68a4ec" strokeWidth={6} status="active" />
      </div>
    )
  }
];

export default columns;
