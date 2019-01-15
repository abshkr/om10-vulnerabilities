import React, { Component } from "react";
import { Button } from "antd";
import DataTable from "../../../components/table";
import columns from "./columns";

export default class Table extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Button
          type="default"
          icon="plus"
          shape="circle"
          style={{ position: "absolute", right: 60, top: 40 }}
        />
        <DataTable rowKey="kya_key_no" columns={columns(data)} data={data} loading={!!data} />
      </div>
    );
  }
}
