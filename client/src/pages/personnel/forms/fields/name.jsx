import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Name extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_name: value.per_name
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Name">
        {decorator("per_name", {
          rules: [{ required: true, message: "Please Enter A Name." }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
