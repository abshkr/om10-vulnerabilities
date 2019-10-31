import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class DensityRangeHigh extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        base_class_dens_hi: value.base_class_dens_hi
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Density Range (High)">
        {decorator("base_class_dens_hi", {
          rules: [{ required: false, message: "Please Enter a Max Density" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
