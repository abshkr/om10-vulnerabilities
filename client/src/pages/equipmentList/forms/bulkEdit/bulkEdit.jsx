import React, { Component } from "react";
import { Table } from "antd";
import columns from "./columns";
import _ from "lodash";

export default class BulkEdit extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const { data, value } = this.props;
    const matches = _.filter(data, ["eqpt_code", value.eqpt_code]);

    this.setState({
      data: matches
    });
  }

  render() {
    const { data } = this.state;
    const { decorator, setValue } = this.props;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        setValue({
          bulk_edit: selectedRows
        });
      }
    };

    decorator("bulk_edit");

    return (
      <Table
        size="middle"
        bordered
        rowKey="eqpt_id"
        pagination={false}
        title={() => "Apply the Expiry Dates to the following Equipment"}
        rowSelection={rowSelection}
        columns={columns(data)}
        dataSource={data}
      />
    );
  }
}
