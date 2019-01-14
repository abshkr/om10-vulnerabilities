import React, { Component } from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";

export default class Download extends Component {
  render() {
    const { data } = this.props;
    return (
      <CSVLink data={!!data ? data : []}>
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
