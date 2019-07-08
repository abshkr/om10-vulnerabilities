import React from "react";
import "./summary.css";
import { DataTable } from "../../../components";
import columns from "./columns";
import _ from "lodash";

const handleModelling = data => {
  const values = [];

  _.chain(data)
    .groupBy(object => object.tank_bclass_name)
    .map((value, key) => {
      const ullage = _.sumBy(value, o => {
        return parseInt(o.tank_ullage);
      });

      const volume = _.sumBy(value, o => {
        return parseInt(o.tank_cor_vol);
      });

      const capacity = ullage + volume;

      values.push({
        base_name: key,
        tank_count: value.length,
        total_capacity: capacity,
        observed_quantity: volume,
        total_ullage: ullage,
        total_fill: (volume * 100) / capacity
      });

      return true;
    })
    .value();

  return values;
};

const Summary = ({ data }) => {
  return <DataTable rowKey="base_name" columns={columns} data={handleModelling(data)} isLoading={false} />;
};

export default Summary;
