import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class StandardVolume extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_cor_vol: value.tank_cor_vol
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Standard Volume">
        {decorator("tank_cor_vol", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
