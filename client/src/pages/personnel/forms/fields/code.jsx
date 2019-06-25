import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Code extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_code: value.per_code
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Code">
        {decorator("per_code", {
          rules: [{ required: true, message: "Please Enter The Code." }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
