import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class HH extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_hh_level: value.tank_hh_level
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="HH">{decorator("tank_hh_level")(<InputNumber />)}</Form.Item>;
  }
}
