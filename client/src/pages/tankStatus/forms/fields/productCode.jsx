import React, { Component } from "react";
import { Form, Input } from "antd";

export default class ProductCode extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_base: value.tank_base
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Product Code">
        {decorator("tank_base", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input disabled />)}
      </Form.Item>
    );
  }
}
