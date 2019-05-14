import React, { Component } from "react";
import { Form, Input } from "antd";

export default class BaseProductCode extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        base_code: value.base_code
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Base Product Code">
        {decorator("base_code", {
          rules: [{ required: true, message: "Please Enter a Base Product Code" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
