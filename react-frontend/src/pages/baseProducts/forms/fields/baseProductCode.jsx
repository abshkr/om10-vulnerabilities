import React, { Component } from "react";
import { Form, Input } from "antd";

export default class BaseProductCode extends Component {
  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Base Product Code">
        {decorator("base_code", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
