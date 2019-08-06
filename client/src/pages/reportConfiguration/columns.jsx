import React from "react";
import _ from "lodash";
import { Tag, Icon } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, configuration) => {
  const values = defaults(data);
  const config = configuration.columns.baseProducts;
  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return values;
};

const defaults = data => [
  {
    title: "Company Code",
    dataIndex: "report_cmpycode",
    key: "report_cmpycode",
    width: 130,
    fixed: "left",
    filters: generate(data, "report_cmpycode"),
    onFilter: (value, record) => record.report_cmpycode.indexOf(value) === 0
  },
  {
    title: "Report Company",
    dataIndex: "report_cmpyname",
    key: "report_cmpyname",
    width: 160,
    filters: generate(data, "report_cmpyname"),
    onFilter: (value, record) => record.report_cmpyname.indexOf(value) === 0
  },
  {
    title: "Report Type",
    dataIndex: "report_type_name",
    key: "report_type_name",
    width: 120,
    filters: generate(data, "report_type_name"),
    onFilter: (value, record) => record.report_type_name.indexOf(value) === 0
  },
  {
    title: "Report Name",
    dataIndex: "report_name",
    key: "report_name",
    width: 350
  },
  {
    title: "Description",
    dataIndex: "report_desc",
    key: "report_desc",
    width: 100
  },
  {
    title: "Report Source",
    dataIndex: "report_jasper_file",
    key: "report_jasper_file",
    width: 250
  },
  {
    title: "Enabled",
    dataIndex: "report_enabled",
    key: "report_enabled",
    width: 100
  },
  {
    title: "Active",
    dataIndex: "report_active",
    key: "report_active",
    width: 100
  },
  {
    title: "Can Be Printed",
    dataIndex: "report_canprint",
    key: "report_canprint",
    width: 120
  },
  {
    title: "Can Be Emailed",
    dataIndex: "report_canemail",
    key: "report_canemail",
    width: 120
  },
  {
    title: "Company Email",
    dataIndex: "report_cmpyemail",
    key: "report_cmpyemail",
    width: 120
  },
  {
    title: "On Demand Report",
    dataIndex: "report_ondemand_flag",
    key: "report_ondemand_flag",
    width: 180
  },
  {
    title: "Closeout Report",
    dataIndex: "report_closeout_flag",
    key: "report_closeout_flag",
    width: 120
  }
];

export default columns;
