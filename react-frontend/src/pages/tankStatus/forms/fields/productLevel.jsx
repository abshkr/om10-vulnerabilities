import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class ProductLevel extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_api: value.tank_api
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="API">
        {decorator("tank_api", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
