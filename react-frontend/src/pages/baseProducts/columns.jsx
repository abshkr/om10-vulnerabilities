import React from "react";
import { Tag } from "antd";
import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Base Product Code",
    dataIndex: "base_code",
    key: "base_code",
    width: 220,
    fixed: "left"
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
    width: 180,
    render: data => <Tag color={data}>{data === "" ? "N/A" : data}</Tag>
  },
  {
    title: "Base Product Class Id",
    dataIndex: "base_cat",
    key: "base_cat",
    width: 200,
    filters: generate(data, "base_cat"),
    onFilter: (value, record) => record.base_cat.indexOf(value) === 0
  },
  {
    title: "Base Product Classification",
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
    title: "Base Prod Min Density [kg/m3]",
    dataIndex: "base_dens_lo",
    key: "base_dens_lo",
    width: 200
  },
  {
    title: "Base Prod Max Density [kg/m3]",
    dataIndex: "base_dens_hi",
    key: "base_dens_hi",
    width: 200
  },
  {
    title: "Is Additive?",
    dataIndex: "base_adtv",
    key: "base_adtv",
    width: 150
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
    width: 150
  },
  {
    title: "Base Class Min Density [kg/m3]",
    dataIndex: "base_class_dens_lo",
    key: "base_class_dens_lo",
    width: 180
  },
  {
    title: "Base Class Min Density [kg/m3]",
    dataIndex: "base_class_dens_hi",
    key: "base_class_dens_hi",
    width: 180
  },
  {
    title: "Base Class Min Temperature [°C]",
    dataIndex: "base_class_temp_lo",
    key: "base_class_temp_lo",
    width: 180
  },
  {
    title: "Base Class Max Temperature [°C]",
    dataIndex: "base_class_temp_hi",
    key: "base_class_temp_hi",
    width: 180
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
    width: 150
  }
];

export default columns;
