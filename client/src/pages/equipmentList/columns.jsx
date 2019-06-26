import React from "react";
import _ from "lodash";
import { Tag, Icon } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, configuration) => {
  const values = defaults(data);
  const config = configuration.columns.equipmentList;
  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return modified;
};

const defaults = data => [
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
    filters: generate(data, "eqpt_owner_name"),
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
    width: 100
  },
  {
    title: "Load Type",
    dataIndex: "eqpt_load_type_name",
    key: "eqpt_load_type_name",
    width: 100,
    render: text => (
      <span>
        <Icon type={text === "0" ? "close" : "check"} style={{ color: text === "0" ? "#ec6e68" : "#a4ec68" }} />
      </span>
    )
  },
  {
    title: "Registration Expired",
    dataIndex: "eqpt_exp_d1_dmy",
    key: "eqpt_exp_d1_dmy",
    width: 150
  },
  {
    title: "Prime Mover SLP",
    dataIndex: "base_tank_list",
    key: "base_tank_list",
    width: 150,
    render: tanks => <span>{tanks}</span>
  },
  {
    title: "Trailer SLP",
    dataIndex: "base_class_dens_lo",
    key: "base_class_dens_lo",
    width: 180,
    render: data => <span> {data}kg/m3 </span>
  },
  {
    title: "Must Tare In?",
    dataIndex: "eqp_must_tare_in",
    key: "eqp_must_tare_in",
    width: 180,
    render: data => <span> {data} kg/m3 </span>
  },
  {
    title: "Last Modified",
    dataIndex: "eqpt_last_modified",
    key: "eqpt_last_modified",
    width: 150,
    render: data => <span> {data}°C</span>
  },
  {
    title: "Last Used",
    dataIndex: "eqpt_last_used",
    key: "eqpt_last_used",
    width: 150,
    render: data => <span> {data}°C</span>
  }
];

export default columns;
