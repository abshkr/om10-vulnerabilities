import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class DensityRangeLow extends Component {
  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Density Range (Low)">
        {decorator("base_class_dens_lo", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
