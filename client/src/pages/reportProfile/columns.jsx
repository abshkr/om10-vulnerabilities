import React from "react";
import { Icon } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, configuration) => [
  {
    title: "Source Exists",
    dataIndex: "source_exists",
    key: "source_exists",
    width: 130,
    align: "center",
    sorter: (a, b) => a.source_exists.localeCompare(b.source_exists),
    render: text => (
      <span>
        <Icon type={text ? "check" : "close"} style={{ color: text ? "#a4ec68" : "#ec6e68" }} />
      </span>
    )
  },
  {
    title: "Source",
    dataIndex: "report_jasper_file",
    key: "report_jasper_file",
    width: 180,
    filters: generate(data, "report_jasper_file"),
    onFilter: (value, record) => record.report_jasper_file.indexOf(value) === 0
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
    width: 200
  },
  {
    title: "On-Demand Report",
    dataIndex: "report_ondemand_flag",
    key: "report_ondemand_flag",
    align: "center",
    sorter: (a, b) => a.report_ondemand_flag.localeCompare(b.report_ondemand_flag),
    width: 130,
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
    width: 130,
    align: "center",
    sorter: (a, b) => a.report_closeout_flag.localeCompare(b.report_closeout_flag),

    render: text => (
      <span>
        <Icon type={text ? "check" : "close"} style={{ color: text ? "#a4ec68" : "#ec6e68" }} />
      </span>
    )
  },
  {
    title: "Closeout Report By",
    dataIndex: "report_closeout_flag2",
    key: "report_closeout_flag2",
    width: 200,
    align: "center",
    sorter: (a, b) => a.report_closeout_flag2.localeCompare(b.report_closeout_flag2),

    render: text => (
      <span>{text ? "Folio Range [Start/End Folio Number]" : "Date Range [Start/End Date]"}</span>
    )
  }
];

export default columns;
