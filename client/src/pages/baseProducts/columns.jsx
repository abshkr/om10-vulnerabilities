import React from "react";
import _ from "lodash";
import { Tag, Icon } from "antd";
import generate from "../../utils/generateOptions";

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
    title: "Base Product Code",
    dataIndex: "base_code",
    key: "base_code",
    width: 150,
    fixed: "left",
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Base Product Name",
    dataIndex: "base_name",
    key: "base_name",
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  },
  {
    title: "Base Product Color",
    dataIndex: "base_color",
    key: "base_color",
    width: 150,
    render: data => <Tag color={data}>{data === "" ? "N/A" : data}</Tag>
  },
  {
    title: "Class Id",
    dataIndex: "base_cat",
    key: "base_cat",
    width: 150,
    filters: generate(data, "base_cat"),
    onFilter: (value, record) => record.base_cat.indexOf(value) === 0
  },
  {
    title: "Classification",
    dataIndex: "base_class_desc",
    key: "base_class_desc",
    width: 200,
    filters: generate(data, "base_class_desc"),
    onFilter: (value, record) => record.base_class_desc.indexOf(value) === 0
  },
  {
    title: "Base Product Group Code",
    dataIndex: "base_prod_group",
    key: "base_prod_group",
    width: 200
  },
  {
    title: "Base Product Group",
    dataIndex: "base_group_name",
    key: "base_group_name",
    width: 200
  },
  {
    title: "Is Additive?",
    dataIndex: "base_adtv",
    key: "base_adtv",
    width: 100,
    render: text => (
      <span>
        <Icon type={text === "0" ? "close" : "check"} style={{ color: text === "0" ? "#ec6e68" : "#a4ec68" }} />
      </span>
    )
  },
  {
    title: "Number Of Tanks",
    dataIndex: "base_tank_count",
    key: "base_tank_count",
    width: 150
  },
  {
    title: "List of Tanks",
    dataIndex: "base_tank_list",
    key: "base_tank_list",
    width: 440,
    render: tanks => (
      <span>
        {tanks.split(",").map(tank => (
          <Tag key={tank} color="green">
            {tank}
          </Tag>
        ))}
      </span>
    )
  },
  {
    title: "Base Class Min Density",
    dataIndex: "base_class_dens_lo",
    key: "base_class_dens_lo",
    width: 180,
    render: data => <span> {data}kg/m3 </span>
  },
  {
    title: "Base Class Max Density",
    dataIndex: "base_class_dens_hi",
    key: "base_class_dens_hi",
    width: 180,
    render: data => <span> {data} kg/m3 </span>
  },
  {
    title: "Base Class Min Temperature",
    dataIndex: "base_class_temp_lo",
    key: "base_class_temp_lo",
    width: 230,
    render: data => <span> {data}°C</span>
  },
  {
    title: "Base Class Max Temperature",
    dataIndex: "base_class_temp_hi",
    key: "base_class_temp_hi",
    width: 230,
    render: data => <span> {data}°C</span>
  },
  {
    title: "Correction Method",
    dataIndex: "base_corr_mthd_name",
    key: "base_corr_mthd_name",
    width: 150
  },
  {
    title: "Ref Temp Spec",
    dataIndex: "base_ref_temp_spec_name",
    key: "base_ref_temp_spec_name",
    width: 150
  },
  {
    title: "Hot Temp Flag",
    dataIndex: "base_limit_preset_ht",
    key: "base_limit_preset_ht",
    width: 150,
    render: text => (
      <span>
        <Icon type={text === "0" ? "close" : "check"} style={{ color: text === "0" ? "#ec6e68" : "#a4ec68" }} />
      </span>
    )
  }
];

export default columns;
