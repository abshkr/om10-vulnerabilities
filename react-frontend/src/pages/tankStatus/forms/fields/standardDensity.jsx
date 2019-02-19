import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class StandardDensity extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_amb_density: value.tank_amb_density
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Standard Density">
        {decorator("tank_amb_density", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
