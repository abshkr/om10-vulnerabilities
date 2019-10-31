import React from "react";

import { Tag, Icon } from "antd";
import { generateOptions } from "../../utils";

const columns = (data, configuration, t) => [
  {
    title: t("fields.code"),
    dataIndex: "base_code",
    key: "base_code",
    width: 100,
    fixed: "left",
    align: "center",
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: t("fields.name"),
    dataIndex: "base_name",
    key: "base_name",
    width: 200,

    onFilter: (value, record) => record.base_name.indexOf(value) === 0
  },
  {
    title: t("fields.color"),
    dataIndex: "base_color",
    align: "center",
    key: "base_color",
    width: 150,
    render: data => <Tag color={data}>{data === "" ? "N/A" : data}</Tag>
  },
  {
    title: t("fields.classId"),
    dataIndex: "base_cat",
    align: "center",
    key: "base_cat",
    width: 50,
    filters: generateOptions(data, "base_cat"),
    onFilter: (value, record) => record.base_cat.indexOf(value) === 0
  },
  {
    title: t("fields.classification"),
    dataIndex: "base_class_desc",
    align: "center",
    key: "base_class_desc",
    width: 250,
    filters: generateOptions(data, "base_class_desc"),
    onFilter: (value, record) => record.base_class_desc.indexOf(value) === 0
  },
  {
    title: t("fields.groupCode"),
    dataIndex: "base_prod_group",
    align: "center",
    key: "base_prod_group",
    width: 150
  },
  {
    title: t("fields.group"),
    dataIndex: "base_group_name",
    align: "center",
    key: "base_group_name",
    width: 150
  },
  {
    title: t("fields.isAdditive"),
    dataIndex: "base_adtv",
    align: "center",
    key: "base_adtv",
    width: 100,
    render: text => (
      <span>
        <Icon type={text === "0" ? "close" : "check"} style={{ color: text === "0" ? "#ec6e68" : "#a4ec68" }} />
      </span>
    )
  },
  {
    title: t("fields.numberOfTanks"),
    dataIndex: "base_tank_count",
    align: "center",
    key: "base_tank_count",
    width: 150
  },
  {
    title: t("fields.listOfTanks"),
    dataIndex: "base_tank_list",
    align: "center",
    key: "base_tank_list",
    width: 300,
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
    title: t("fields.baseClassMinDensity"),
    dataIndex: "base_class_dens_lo",
    align: "center",
    key: "base_class_dens_lo",
    width: 180,
    render: data => (
      <span>
        {data} {t("units.kgm3")}
      </span>
    )
  },
  {
    title: t("fields.baseClassMaxDensity"),
    dataIndex: "base_class_dens_hi",
    align: "center",
    key: "base_class_dens_hi",
    width: 180,
    render: data => (
      <span>
        {data} {t("units.kgm3")}
      </span>
    )
  },
  {
    title: t("fields.baseClassMinTemp"),
    dataIndex: "base_class_temp_lo",
    align: "center",
    key: "base_class_temp_lo",
    width: 230,
    render: data => (
      <span>
        {data}
        {t("units.celsius")}
      </span>
    )
  },
  {
    title: t("fields.baseClassMaxTemp"),
    dataIndex: "base_class_temp_hi",
    align: "center",
    key: "base_class_temp_hi",
    width: 230,
    render: data => (
      <span>
        {data}
        {t("units.celsius")}
      </span>
    )
  }
];

export default columns;
