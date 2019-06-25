import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Tank extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_name: value.tank_name
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Terminal">{decorator("tank_name")(<Input disabled />)}</Form.Item>;
  }
}
