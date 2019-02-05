import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class DensityRangeHigh extends Component {
  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Density Range (High)">
        {decorator("base_class_dens_hi", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
