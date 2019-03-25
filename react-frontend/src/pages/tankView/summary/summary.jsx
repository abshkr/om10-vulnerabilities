import React from "react";
import "./summary.css";
import { DataTable } from "../../../components";
import columns from "./columns";
import _ from "lodash";

const handleModelling = data => {
  let values = [];

  _(data)
    .groupBy(object => object.tank_bclass_name)
    .map((value, key) =>
      values.push({
        base_name: key,
        tank_count: value.length,
        total_capacity: 0,
        observed_quantity: 0,
        total_ullage: _.sumBy(value, function(o) {
          return parseInt(o.tank_ullage);
        }),
        total_fill: 0
      })
    )
    .value();

  return values;
};

const Summary = ({ data }) => {
  return (
    <DataTable
      rowKey="base_name"
      columns={columns}
      data={handleModelling(data)}
      loading={true}
      scroll={900}
    />
  );
};

export default Summary;
