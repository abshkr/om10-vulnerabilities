import React, { Component } from "react";
import { Form, Input } from "antd";

export default class LeakDetection extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_leakdtct_on: value.tank_leakdtct_on
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Leak Detection">
        {decorator("tank_leakdtct_on", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input disabled />)}
      </Form.Item>
    );
  }
}
