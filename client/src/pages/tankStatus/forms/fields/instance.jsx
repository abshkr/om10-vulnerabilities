import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Instance extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_instance: value.tank_instance
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Instance">{decorator("tank_instance")(<Input />)}</Form.Item>;
  }
}
