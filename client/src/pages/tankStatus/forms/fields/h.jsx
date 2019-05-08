import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class H extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_h_level: value.tank_h_level
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="H">{decorator("tank_h_level")(<InputNumber />)}</Form.Item>;
  }
}
