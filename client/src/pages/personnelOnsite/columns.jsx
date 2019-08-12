import React from "react";

import _ from "lodash";
import { generateOptions, validateDateTime } from "../../utils";

const columns = (data) => defaults(data);

const defaults = (data) => {
  return [
    {
      title: "Code",
      dataIndex: "per_code",
      key: "per_code",
      width: 100,
      // fixed: "left",
      // align: "center",
      sorter: (a, b) => a.per_code.localeCompare(b.per_code),
    },
    {
      title: "Name",
      dataIndex: "per_name",
      key: "per_name",
      width: 150,
      sorter: (a, b) => a.per_name.localeCompare(b.per_name)
    },
    {
      title: "Company",
      dataIndex: "cmpy_name",
      key: "cmpy_name",
      width: 150,
      sorter: (a, b) => a.cmpy_name.localeCompare(b.cmpy_name),
      filters: generateOptions(data, "cmpy_name"),
      onFilter: (value, record) => record.cmpy_name.indexOf(value) === 0
    },
    {
      title: "Area ID",
      dataIndex: "area_k",
      key: "area_k",
      width: 150,
      sorter: (a, b) => a.area_k.localeCompare(b.area_k)
    },
    {
      title: "Area Name",
      dataIndex: "area_name",
      key: "area_name",
      width: 300,
      sorter: (a, b) => a.area_name.localeCompare(b.area_name),
      filters: generateOptions(data, "area_name"),
      onFilter: (value, record) => record.area_name.indexOf(value) === 0
    },
    {
      title: "Enter Time",
      dataIndex: "perl_enter_time",
      key: "perl_enter_time",
      width: 130,
      align: "center",
      sorter: (a, b) =>
        validateDateTime(b.perl_enter_time) - validateDateTime(a.perl_enter_time),
    },
  ];
};
export default columns;
