import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Printer extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        prntr: value.prntr
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Logical Printer">
        {decorator("prntr", {
          rules: [{ required: true, message: "Please Select A Logical Printer" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
