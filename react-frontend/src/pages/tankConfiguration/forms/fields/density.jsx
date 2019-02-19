import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Density extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_density: value.tank_density
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Density">
        {decorator("tank_density", {
          rules: [{ required: true, message: "please enter a density." }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
