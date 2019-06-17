import React, { Component } from "react";
import { Form, Input } from "antd";

export default class SystemPrinter extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        sys_prntr: value.sys_prntr
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="System / Physical Printer">
        {decorator("sys_prntr", {
          rules: [{ required: true, message: "Please Select A Printer" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
