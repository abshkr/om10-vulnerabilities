import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class Ullage extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_ullage: value.tank_ullage
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Ullage">
        {decorator("tank_ullage", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
