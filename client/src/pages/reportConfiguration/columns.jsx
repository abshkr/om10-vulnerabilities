import React from "react";
import { Icon } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, configuration) => [
  {
    title: "Company Code",
    dataIndex: "report_cmpycode",
    key: "report_cmpycode",
    width: 130,
    fixed: "left",
    align: "center",
    filters: generate(data, "report_cmpycode"),
    onFilter: (value, record) => record.report_cmpycode.indexOf(value) === 0
  },
  {
    title: "Company",
    dataIndex: "report_cmpyname",
    key: "report_cmpyname",
    width: 120,
    align: "center",
    filters: generate(data, "report_cmpyname"),
    onFilter: (value, record) => record.report_cmpyname.indexOf(value) === 0
  },
  {
    title: "Type",
    dataIndex: "report_type_name",
    key: "report_type_name",
    width: 120,
    align: "center",
    filters: generate(data, "report_type_name"),
    onFilter: (value, record) => record.report_type_name.indexOf(value) === 0
  },
  {
    title: "Name",
    dataIndex: "report_name",
    key: "report_name",
    sorter: (a, b) => a.report_name.localeCompare(b.report_name),
    width: 300
  },
  {
    title: "Description",
    dataIndex: "report_desc",
    key: "report_desc",
    sorter: (a, b) => a.report_desc.localeCompare(b.report_desc),
    width: 130
  },
  {
    title: "Source",
    dataIndex: "report_jasper_file",
    key: "report_jasper_file",
    sorter: (a, b) => a.report_jasper_file.localeCompare(b.report_jasper_file),
    width: 230
  },
  {
    title: "Enabled",
    dataIndex: "report_enabled",
    key: "report_enabled",
    width: 100,
    align: "center",
    sorter: (a, b) => a.report_enabled.localeCompare(b.report_enabled),

    render: text => (
      <span>
        <Icon type={text ? "check" : "close"} style={{ color: text ? "#a4ec68" : "#ec6e68" }} />
      </span>
    )
  },
  {
    title: "Active",
    dataIndex: "report_active",
    key: "report_active",
    width: 100,
    align: "center",
    sorter: (a, b) => a.report_active.localeCompare(b.report_active),

    render: text => (
      <span>
        <Icon type={text ? "check" : "close"} style={{ color: text ? "#a4ec68" : "#ec6e68" }} />
      </span>
    )
  },
  {
    title: "Can Be Printed",
    dataIndex: "report_canprint",
    key: "report_canprint",
    width: 150,
    align: "center",
    sorter: (a, b) => a.report_canprint.localeCompare(b.report_canprint),
    render: text => (
      <span>
        <Icon type={text ? "check" : "close"} style={{ color: text ? "#a4ec68" : "#ec6e68" }} />
      </span>
    )
  },
  {
    title: "Can Be Emailed",
    dataIndex: "report_canemail",
    key: "report_canemail",
    align: "center",
    sorter: (a, b) => a.report_canemail.localeCompare(b.report_canemail),
    width: 160,
    render: text => (
      <span>
        <Icon type={text ? "check" : "close"} style={{ color: text ? "#a4ec68" : "#ec6e68" }} />
      </span>
    )
  },
  {
    title: "Company Email",
    dataIndex: "report_cmpyemail",
    key: "report_cmpyemail",
    sorter: (a, b) => a.report_cmpyemail.localeCompare(b.report_cmpyemail),
    width: 150
  },
  {
    title: "On Demand Report",
    dataIndex: "report_ondemand_flag",
    key: "report_ondemand_flag",
    align: "center",
    sorter: (a, b) => a.report_ondemand_flag.localeCompare(b.report_ondemand_flag),
    width: 180,
    render: text => (
      <span>
        <Icon type={text ? "check" : "close"} style={{ color: text ? "#a4ec68" : "#ec6e68" }} />
      </span>
    )
  },
  {
    title: "Closeout Report",
    dataIndex: "report_closeout_flag",
    key: "report_closeout_flag",
    align: "center",
    sorter: (a, b) => a.report_closeout_flag.localeCompare(b.report_closeout_flag),
    width: 150,
    render: text => (
      <span>
        <Icon type={text ? "check" : "close"} style={{ color: text ? "#a4ec68" : "#ec6e68" }} />
      </span>
    )
  }
];

export default columns;
