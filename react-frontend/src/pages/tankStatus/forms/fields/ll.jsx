import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class LL extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_ll_level: value.tank_ll_level
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="LL">
        {decorator("tank_ll_level", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
