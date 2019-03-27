import React, { Component } from "react";
import { Form, Input } from "antd";

export default class GaugeIdentifer extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_identifier: value.tank_identifier
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Gauge Identifer">
        {decorator("tank_identifier", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
