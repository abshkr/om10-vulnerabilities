import React, { Component } from "react";
import { Form, Input } from "antd";

export default class ProductName extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_base_name: value.tank_base_name
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Product Name">{decorator("tank_base_name")(<Input disabled />)}</Form.Item>;
  }
}
