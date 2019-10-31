import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class DensityRangeLow extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        base_class_dens_lo: value.base_class_dens_lo
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Density Range (Low)">
        {decorator("base_class_dens_lo", {
          rules: [{ required: false, message: "Please Enter a Min Density" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
