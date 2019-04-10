import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class UserL extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_ul_level: value.tank_ul_level
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="User L">
        {decorator("tank_ul_level", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
