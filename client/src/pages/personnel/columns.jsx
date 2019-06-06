import React from "react";
import { Tag } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, roles) => [
  {
    title: "Code",
    dataIndex: "per_code",
    key: "per_code",
    width: 150,
    fixed: "left",
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Name",
    dataIndex: "per_name",
    key: "per_name",
    width: 200
  },
  {
    title: "Employer Code",
    dataIndex: "cmpy_code",
    key: "cmpy_code",
    width: 150,
    filters: generate(data, "cmpy_code"),
    onFilter: (value, record) => record.cmpy_code.indexOf(value) === 0
  },
  {
    title: "Employer",
    dataIndex: "cmpy_name",
    key: "cmpy_name",
    width: 250,
    filters: generate(data, "cmpy_name"),
    onFilter: (value, record) => record.cmpy_name.indexOf(value) === 0
  },
  {
    title: "Role",
    dataIndex: "per_auth",
    key: "per_auth",
    width: 100,
    filters: generate(data, "per_auth"),
    onFilter: (value, record) => record.per_auth.indexOf(value) === 0,
    render: data => <Tag color="blue">{data}</Tag>
  },
  {
    title: "Licence No.",
    dataIndex: "per_licence_no",
    key: "per_licence_no",
    width: 250
  },
  {
    title: "Driving Licence",
    dataIndex: "per_last_dmy",
    key: "per_last_dmy",
    width: 250
  },
  {
    title: "Medical",
    dataIndex: "kya_psnl_name",
    key: "kya_psnl_name",
    width: 250
  },
  {
    title: "Area Access",
    dataIndex: "kya_role_name",
    key: "kya_role_name",
    width: 100
  },
  {
    title: "Status",
    dataIndex: "per_lock",
    key: "per_lock",
    width: 100,
    filters: generate(data, "per_lock"),
    onFilter: (value, record) => String(record.per_lock).indexOf(value) === 0,
    render: data => <Tag color={data === "N" ? "" : "green"}>{data === "N" ? "Inactive" : "Active"}</Tag>
  },
  {
    title: "Department",
    dataIndex: "per_department",
    key: "per_department",
    width: 150,
    filters: generate(data, "per_department"),
    onFilter: (value, record) => String(record.per_department).indexOf(value) === 0
  },
  {
    title: "Email",
    dataIndex: "per_email",
    key: "per_email",
    width: 150,
    filters: generate(data, "per_email"),
    onFilter: (value, record) => String(record.per_email).indexOf(value) === 0
  },
  {
    title: "Last Modified",
    dataIndex: "kya_supp_name",
    key: "kya_supp_name",
    width: 150,
    filters: generate(data, "kya_supp_name"),
    onFilter: (value, record) => String(record.kya_supp_name).indexOf(value) === 0
  },
  {
    title: "Last Used",
    dataIndex: "user_last_reason",
    key: "user_last_reason",
    width: 150,
    filters: generate(data, "user_last_reason"),
    onFilter: (value, record) => String(record.user_last_reason).indexOf(value) === 0
  }
];
export default columns;
