import React from "react";
import { Icon } from "antd";
import { CHECK_COLOURS } from "../../constants";

const columns = data => [
  {
    title: "Tank Code",
    dataIndex: "tank_code",
    key: "tank_code",
    width: 100,
    fixed: "left"
  },
  {
    title: "In Use?",
    dataIndex: "tank_active",
    key: "tank_active",
    width: 50,
    render: payload => <Icon style={{ color: CHECK_COLOURS[payload === "1" ? "Y" : "N"], fontSize: 16 }} type={payload === "1" ? "check" : "close"} />
  },
  {
    title: "Tank Name",
    dataIndex: "tank_name",
    key: "tank_name",
    width: 100
  },
  {
    title: "Terminal",
    dataIndex: "tank_sitename",
    key: "tank_sitename",
    width: 100
  },
  {
    title: "Product Code",
    dataIndex: "tank_base",
    key: "tank_base",
    width: 150
  },
  {
    title: "Product Name",
    dataIndex: "tank_base_name",
    key: "tank_base_name",
    width: 200
  },
  {
    title: "Product Category",
    dataIndex: "tank_bclass_name",
    key: "tank_bclass_name",
    width: 200
  },
  {
    title: "Area",
    dataIndex: "tank_location",
    key: "tank_location",
    width: 150
  },
  {
    title: "Product Level",
    dataIndex: "tank_prod_lvl",
    key: "tank_prod_lvl",
    width: 100,
    render: text => <span>{`${text} mm`}</span>
  },
  {
    title: "Level Alarm State",
    dataIndex: "tank_lvlalarm_desc",
    key: "tank_lvlalarm_desc",
    width: 150
  },
  {
    title: "Gauging Method",
    dataIndex: "tank_gaugingmthd_desc",
    key: "tank_gaugingmthd_desc",
    width: 150
  },
  {
    title: "Ambient Volume",
    dataIndex: "tank_amb_vol",
    key: "tank_amb_vol",
    width: 150,
    render: text => <span>{`${text} L`}</span>
  },
  {
    title: "Std Volume",
    dataIndex: "tank_cor_vol",
    key: "tank_cor_vol",
    width: 120,
    render: text => <span>{`${text} L`}</span>
  },
  {
    title: "Liquid Mass",
    dataIndex: "tank_liquid_kg",
    key: "tank_liquid_kg",
    width: 120,
    render: text => <span>{`${text} Kg`}</span>
  },
  {
    title: "Ullage",
    dataIndex: "tank_ullage",
    key: "tank_ullage",
    width: 100
  },
  {
    title: "Density",
    dataIndex: "tank_density",
    key: "tank_density",
    width: 150,
    render: text => <span>{`${text} Kg/m3`}</span>
  },
  {
    title: "Std Density",
    dataIndex: "tank_amb_density",
    key: "tank_amb_density",
    width: 150,
    render: text => <span>{`${text} Kg/m3`}</span>
  },
  {
    title: "API @ 60F",
    dataIndex: "tank_api",
    key: "tank_api",
    width: 100
  },
  {
    title: "Observed Temperature",
    dataIndex: "tank_temp",
    key: "tank_temp",
    width: 150
  },
  {
    title: "Tank Group",
    dataIndex: "tank_group",
    key: "tank_group",
    width: 150
  },
  {
    title: "ATG Manual Updated",
    dataIndex: "tank_atg_manchg",
    key: "tank_atg_manchg",
    width: 150
  },
  {
    title: "Sulphur",
    dataIndex: "tank_sulphur",
    key: "tank_sulphur",
    width: 150,
    render: text => <span>{`${text} wt%`}</span>
  },
  {
    title: "Flash Point",
    dataIndex: "tank_flashpoint",
    key: "tank_flashpoint",
    width: 150
  },
  {
    title: "Tank Status",
    dataIndex: "tank_status",
    key: "tank_status",
    width: 100
  },
  {
    title: "Tank Status Desc",
    dataIndex: "tank_status_name",
    key: "tank_status_name",
    width: 150
  },
  {
    title: "HH",
    dataIndex: "tank_hh_level",
    key: "tank_hh_level",
    width: 150
  },
  {
    title: "H",
    dataIndex: "tank_h_level",
    key: "tank_h_level",
    width: 150
  },
  {
    title: "LL",
    dataIndex: "tank_ll_level",
    key: "tank_ll_level",
    width: 150
  },
  {
    title: "L",
    dataIndex: "tank_l_level",
    key: "tank_l_level",
    width: 150
  },
  {
    title: "User H",
    dataIndex: "tank_uh_level",
    key: "tank_uh_level",
    width: 150
  },
  {
    title: "User L",
    dataIndex: "tank_ul_level",
    key: "tank_ul_level",
    width: 150
  }
];

export default columns;
