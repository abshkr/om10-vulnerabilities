import React, { Component } from "react";
import { Form, Input } from "antd";

export default class AreaName extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        area_name: value.area_name
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Area Name">
        {decorator("area_name", {
          rules: [{ required: true, message: "Please set area name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
