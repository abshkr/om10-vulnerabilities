import React from "react";

import _ from "lodash";
import moment from "moment";
import { Tag, Icon } from "antd";
import generate from "../../utils/generateOptions";

const columns = (data, roles, configuration, expiry) => {
  const values = defaults(data, roles, configuration, expiry);
  const config = configuration.columns.personnel;
  const modified = _.reject(values, o => {
    return !config[o.dataIndex];
  });

  return modified;
};

const defaults = (data, roles, config, expiry) => {
  const expiryOne = _.find(expiry, ["edt_type_code", "PSNL_EXPIRY_DATE_1"]);
  const expiryTwo = _.find(expiry, ["edt_type_code", "PSNL_EXPIRY_DATE_2"]);
  const expiryThree = _.find(expiry, ["edt_type_code", "PSNL_EXPIRY_DATE_3"]);

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
      title: "Code",
      dataIndex: "per_code",
      key: "per_code",
      width: 100,
      fixed: "left",
      onFilter: (value, record) => record.per_code.indexOf(value) === 0,
      sorter: (a, b) => a.per_code.localeCompare(b.per_code),
      // eslint-disable-next-line
      render: text => <a>{text}</a>
    },
    {
      title: "Name",
      dataIndex: "per_name",
      key: "per_name",
      width: 150,
      onFilter: (value, record) => record.per_name.indexOf(value) === 0,
      sorter: (a, b) => a.per_name.localeCompare(b.per_name)
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
      width: 150,
      filters: generate(data, "per_auth", roles, "role_id", "role_name"),
      onFilter: (value, record) => record.per_auth.indexOf(value) === 0,
      render: text => <Tag color="blue">{!!_.find(roles, ["role_id", text]) ? _.find(roles, ["role_id", text]).role_name : ""}</Tag>
    },
    {
      title: "Licence No.",
      dataIndex: "per_licence_no",
      key: "per_licence_no",
      width: 250,
      onFilter: (value, record) => record.per_licence_no.indexOf(value) === 0,
      sorter: (a, b) => a.per_licence_no.localeCompare(b.per_licence_no)
    },
    {
      title: !!expiryOne ? expiryOne.edt_type_desc : "Expiry 1",
      dataIndex: "per_exp_d1_dmy",
      key: "per_exp_d1_dmy",
      width: 170,
      render: data => <span>{data.substring(0, 10)}</span>
    },
    {
      title: !!expiryTwo ? expiryTwo.edt_type_desc : "Expiry 2",
      dataIndex: "per_exp_d2_dmy",
      key: "per_exp_d2_dmy",
      width: 220,
      render: data => <span>{data.substring(0, 10)}</span>
    },
    {
      title: !!expiryThree ? expiryThree.edt_type_desc : "Expiry 3",
      dataIndex: "per_exp_d3_dmy",
      key: "per_exp_d3_dmy",
      width: 170,

      // eslint-disable-next-line
      render: data => <span>{data.substring(0, 10)}</span>
    },
    {
      title: "Area Access",
      dataIndex: "per_lock",
      key: "per_lock",
      width: 130,
      onFilter: (value, record) => record.per_lock.indexOf(value) === 0,
      sorter: (a, b) => a.per_lock.localeCompare(b.per_lock),
      render: text => (
        <span>
          <Icon type={text === "N" ? "unlock" : "lock"} />
        </span>
      )
    },
    {
      title: "Status",
      dataIndex: "user_status_flag",
      key: "user_status_flag",
      width: 100,
      filters: generate(data, "user_status_flag"),
      onFilter: (value, record) => String(record.user_status_flag).indexOf(value) === 0,
      render: data => <Tag color={lockColors[data]}>{lockStatus[data]}</Tag>
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
      width: 200,
      onFilter: (value, record) => record.per_email.indexOf(value) === 0,
      sorter: (a, b) => a.per_email.localeCompare(b.per_email)
    },
    {
      title: "Last Modified",
      dataIndex: "per_last_modified",
      key: "per_last_modified",
      width: 250,
      sorter: (a, b) => moment(b.per_last_modified, config.defaultTimeFormat).valueOf() - moment(a.per_last_modified, config.defaultTimeFormat).valueOf(),
      // eslint-disable-next-line
      render: text => <a>{text !== "" ? moment(text, config.defaultTimeFormat).format(config.dateTimeFormat) : ""}</a>
    },
    {
      title: "Last Used",
      dataIndex: "user_last_reason",
      key: "user_last_reason",
      width: 250,
      sorter: (a, b) => moment(b.user_last_reason, config.defaultTimeFormat).valueOf() - moment(a.user_last_reason, config.defaultTimeFormat).valueOf(),
      // eslint-disable-next-line
      render: text => <a>{text !== "" ? moment(text, config.defaultTimeFormat).format(config.dateTimeFormat) : ""}</a>
    }
  ];
};
export default columns;
