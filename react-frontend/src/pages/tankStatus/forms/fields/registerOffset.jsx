import React, { Component } from "react";
import { Form, Input } from "antd";

export default class RegisterOffset extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_address: value.tank_address
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Register Offset">
        {decorator("tank_address", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
