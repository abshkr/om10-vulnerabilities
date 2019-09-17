import React from "react";

const columns = t => [
  {
    title: t("fields.code"),
    dataIndex: "per_code",
    key: "per_code",
    align: "center",
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: t("fields.name"),
    dataIndex: "per_name",
    key: "per_name",
    align: "center"
  },
  {
    title: t("fields.employerCode"),
    dataIndex: "cmpy_code",
    key: "cmpy_code",
    align: "center"
  },
  {
    title: t("fields.employer"),
    dataIndex: "cmpy_name",
    key: "cmpy_name",
    width: 300
  }
];

export default columns;
