import React, { Component } from "react";
import { Form, Input } from "antd";

export default class BaseProductName extends Component {
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
      <Form.Item label="Base Product Name">
        {decorator("base_name", {
          rules: [{ required: true, message: "Please Enter a Base Name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
