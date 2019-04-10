import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class ProductLevel extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_prod_lvl: value.tank_prod_lvl
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Product Level">
        {decorator("tank_prod_lvl", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
