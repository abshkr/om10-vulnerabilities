import React, { Component } from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";

export default class Download extends Component {
  render() {
    const { data, type } = this.props;
    return (
      <CSVLink data={!!data ? data : []} ilename={`omega5000-${type}.csv`}>
        <Button
          type="default"
          shape="circle"
          icon="download"
          style={{ position: "absolute", right: 100, top: 40 }}
        />
      </CSVLink>
    );
  }
}
