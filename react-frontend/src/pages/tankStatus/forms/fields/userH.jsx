import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class UserH extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_uh_level: value.tank_uh_level
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="User H">
        {decorator("tank_uh_level", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
