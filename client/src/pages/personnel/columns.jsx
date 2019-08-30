import React from "react";

import _ from "lodash";
import { Tag, Icon } from "antd";
import { generateOptions, validateDateTime, convertToLocale } from "../../utils";

const columns = (data, roles, config, t) => {
  const lockStatus = {
    "1": "Active",
    "2": "Locked",
    "0": "Inactive"
  };

  const lockColors = {
    "1": "green",
    "2": "red",
    "0": ""
  };

  return [
    {
      title: t("fields.code"),
      dataIndex: "per_code",
      key: "per_code",
      width: 100,
      fixed: "left",
      align: "center",
      onFilter: (value, record) => record.per_code.indexOf(value) === 0,
      sorter: (a, b) => a.per_code.localeCompare(b.per_code),
      // eslint-disable-next-line
      render: text => <a>{text}</a>
    },
    {
      title: t("fields.name"),
      dataIndex: "per_name",
      key: "per_name",
      width: 150,
      onFilter: (value, record) => record.per_name.indexOf(value) === 0,
      sorter: (a, b) => a.per_name.localeCompare(b.per_name)
    },
    {
      title: t("fields.employerCode"),
      dataIndex: "cmpy_code",
      key: "cmpy_code",
      width: 150,
      align: "center",
      sorter: (a, b) => a.cmpy_code.localeCompare(b.cmpy_code),
      onFilter: (value, record) => record.cmpy_code.indexOf(value) === 0
    },
    {
      title: t("fields.employer"),
      dataIndex: "cmpy_name",
      key: "cmpy_name",
      width: 300,
      filters: generateOptions(data, "cmpy_name"),
      onFilter: (value, record) => record.cmpy_name.indexOf(value) === 0
    },
    {
      title: t("fields.role"),
      dataIndex: "per_auth",
      key: "per_auth",
      width: 130,
      align: "center",
      filters: generateOptions(data, "per_auth", roles, "role_id", "role_name"),
      onFilter: (value, record) => record.per_auth.indexOf(value) === 0,
      render: text => <Tag color="blue">{!!_.find(roles, ["role_id", text]) ? _.find(roles, ["role_id", text]).role_name : ""}</Tag>
    },
    {
      title: t("fields.licenceNumber"),
      dataIndex: "per_licence_no",
      key: "per_licence_no",
      width: 150,
      onFilter: (value, record) => record.per_licence_no.indexOf(value) === 0,
      sorter: (a, b) => a.per_licence_no.localeCompare(b.per_licence_no)
    },

    {
      title: t("fields.areaAccess"),
      dataIndex: "per_lock",
      key: "per_lock",
      width: 130,
      align: "center",
      onFilter: (value, record) => record.per_lock.indexOf(value) === 0,
      sorter: (a, b) => a.per_lock.localeCompare(b.per_lock),
      render: text => (
        <span>
          <Icon type={text === "N" ? "unlock" : "lock"} />
        </span>
      )
    },
    {
      title: t("fields.status"),
      dataIndex: "user_status_flag",
      key: "user_status_flag",
      width: 100,
      align: "center",
      filters: generateOptions(data, "user_status_flag"),
      onFilter: (value, record) => String(record.user_status_flag).indexOf(value) === 0,
      render: data => <Tag color={lockColors[data]}>{lockStatus[data]}</Tag>
    },
    {
      title: t("fields.department"),
      dataIndex: "per_department",
      key: "per_department",
      width: 150,
      align: "center",
      filters: generateOptions(data, "per_department"),
      onFilter: (value, record) => String(record.per_department).indexOf(value) === 0
    },
    {
      title: t("fields.email"),
      dataIndex: "per_email",
      key: "per_email",
      width: 200,
      align: "center",
      onFilter: (value, record) => record.per_email.indexOf(value) === 0,
      sorter: (a, b) => a.per_email.localeCompare(b.per_email)
    },
    {
      title: t("fields.lastModified"),
      dataIndex: "per_last_modified",
      key: "per_last_modified",
      width: 250,
      align: "center",
      sorter: (a, b) => validateDateTime(b.tnkr_last_modified) - validateDateTime(a.tnkr_last_modified),
      render: text => <span>{convertToLocale(text)}</span>
    },
    {
      title: t("fields.lastUsed"),
      dataIndex: "user_last_reason",
      key: "user_last_reason",
      width: 250,
      align: "center",
      sorter: (a, b) => validateDateTime(b.user_last_reason) - validateDateTime(a.user_last_reason),
      render: text => <span>{convertToLocale(text)}</span>
    }
  ];
};
export default columns;
