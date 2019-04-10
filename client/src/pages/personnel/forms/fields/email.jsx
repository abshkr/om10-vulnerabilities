import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Email extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        base_name: value.base_name
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Email">
        {decorator("base_name", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
