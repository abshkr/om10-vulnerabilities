import React, { Component } from "react";
import { Form, Input } from "antd";

export default class TankName extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_name: value.tank_name
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Tank Name">
        {decorator("tank_name", {
          rules: [{ required: true, message: "Please enter a Tank Name." }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
