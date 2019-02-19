import React, { Component } from "react";
import { Form, Input } from "antd";

export default class TankCode extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_code: value.tank_code
      });
    }
  }

  render() {
    const { decorator, disabled } = this.props;

    return (
      <Form.Item label="Tank Code">
        {decorator("tank_code", {
          rules: [{ required: true, message: "please enter a tank code" }]
        })(<Input disabled={disabled} />)}
      </Form.Item>
    );
  }
}
