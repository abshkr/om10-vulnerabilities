import React from "react";
import _ from "lodash";
import { Tag, Avatar, Icon } from "antd";
import generate from "../../utils/generateOptions";

const filterFlow = (tank, flowRateList) => {
  const flow = _.find(flowRateList, ["tank_code", tank]);
  if (!!flow) {
    if (flow.flowing === "Y") {
      return "green";
    } else {
      return "volcano";
    }
  } else {
    return "";
  }
};

const filterTanks = (base, flowRateList) => {
  const filtered = _.filter(flowRateList, ["base_code", base]);

  if (filtered.length === 0) {
    return <Tag color="gold">No Tanks Available</Tag>;
  }

  if (filtered.length > 0) {
    return filtered.map(tag => (
      <Tag color={filterFlow(tag.tank_code, flowRateList)} key={tag.tank_code}>
        {tag.tank_code}
      </Tag>
    ));
  }
};

const columns = (data, flowRateList) => [
  {
    title: "Profile",
    dataIndex: "base_name",
    key: "base_name_1",
    width: 220,
    fixed: "left",
    onFilter: (value, record) => record.base_name.indexOf(value) === 0,
    render: (value, record) => <Avatar style={{ backgroundColor: record.base_color }}>{value.substring(0, 1)}</Avatar>
  },
  {
    title: "Base Product Code",
    dataIndex: "base_code",
    key: "base_code",
    width: 250,
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Base Product Name",
    dataIndex: "base_name",
    key: "base_name2",
    width: 250,
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  },
  {
    title: "State",
    dataIndex: "afc_enabled",
    key: "afc_enabled",
    filters: generate(data, "base_name"),
    width: 150,
    render: state => (
      <span>
        {state === "Y" ? (
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 24 }} />
        ) : (
          <Icon type="close-circle" theme="twoTone" twoToneColor="#fa541c" style={{ fontSize: 24 }} />
        )}
      </span>
    )
  },
  {
    title: "Arm Priority",
    dataIndex: "afc_priority",
    key: "afc_priority",
    filters: generate(data, "base_name"),
    width: 250,
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  },
  {
    title: "Tanks",
    dataIndex: "base_code",
    key: "tanks",
    render: base => <span>{filterTanks(base, flowRateList)}</span>
  }
];

export default columns;
