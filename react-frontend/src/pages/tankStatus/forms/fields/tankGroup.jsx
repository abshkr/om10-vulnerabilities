import React, { Component } from "react";
import { Form, Input } from "antd";

export default class TankGroup extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_group: value.tank_group
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Tank Group">
        {decorator("tank_group", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input disabled />)}
      </Form.Item>
    );
  }
}
