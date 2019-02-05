import React, { Component } from "react";
import { Form, Input } from "antd";

export default class BaseProductName extends Component {
  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Base Product Name">
        {decorator("base_name", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
