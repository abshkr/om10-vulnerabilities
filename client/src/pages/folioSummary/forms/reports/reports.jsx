import React, { Component } from "react";
import columns from "./columns";
import { DataTable } from "../../../../components";
import _ from "lodash";

export default class Reports extends Component {
  handleDataModel = data => {
    const payload = [];
    _.forEach(data, (value, index) => {
      payload.push({
        index,
        value
      });
    });
    return payload;
  };

  render() {
    const { data, id } = this.props;
    return (
      <div>
        <DataTable isLoading={false} rowKey="value" columns={columns(id)} data={this.handleDataModel(data)} />
      </div>
    );
  }
}
