import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class ObservedTemperature extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_temp: value.tank_temp
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Obsvd Temp">
        {decorator("tank_temp", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
