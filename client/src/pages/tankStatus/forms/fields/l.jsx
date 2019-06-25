import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class L extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_l_level: value.tank_l_level
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="L">{decorator("tank_l_level")(<InputNumber />)}</Form.Item>;
  }
}
