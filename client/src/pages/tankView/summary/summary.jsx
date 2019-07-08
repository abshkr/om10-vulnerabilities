import React, { Component } from "react";
import { DataTable } from "../../../components";
import columns from "./columns";
import _ from "lodash";

import "./summary.css";

export default class Summary extends Component {
  handleModelling = data => {
    const values = [];

    _.chain(data)
      .groupBy(object => object.tank_bclass_name)
      .map((value, key) => {
        const ullage = _.sumBy(value, tank => {
          return parseInt(tank.tank_ullage);
        });

        const volume = _.sumBy(value, tank => {
          return parseInt(tank.tank_cor_vol);
        });

        const capacity = ullage + volume;

        const fill = (volume * 100) / capacity;

        values.push({
          base_name: key,
          tank_count: value.length,
          total_capacity: capacity,
          observed_quantity: volume,
          total_ullage: ullage,
          total_fill: _.isNaN(fill) ? 0 : fill
        });

        return true;
      })
      .value();
    return values;
  };

  render() {
    const { data } = this.props;
    return <DataTable rowKey="base_name" columns={columns} data={this.handleModelling(data)} isLoading={false} />;
  }
}
