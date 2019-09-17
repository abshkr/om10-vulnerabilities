import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Name extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_name: value.report_name
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Name">
        {decorator("report_name", {
          rules: [{ required: true, message: "Please Enter a Report Name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
