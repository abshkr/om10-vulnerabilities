import React from "react";
import { Tag, Progress } from "antd";
import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Tank Code",
    dataIndex: "tankCode",
    key: "tankCode",
    width: 200,
    render: tank => (
      <span>
        <Tag color="green">{tank}</Tag>
      </span>
    )
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
    title: "Tank Level",
    dataIndex: "level",
    key: "level",
    width: 250
  },
  {
    title: "Total Flow Contribution",
    dataIndex: "flowRate",
    key: "flowRate",
    render: percent => (
      <div style={{ display: "flex", flexDirection: "column", width: "95%" }}>
        <Progress percent={percent} strokeColor={percent > 100 ? "#ec6e68" : "#68a4ec"} strokeWidth={6} status={percent > 100 ? "exception" : "active"} />
      </div>
    )
  }
];

export default columns;
