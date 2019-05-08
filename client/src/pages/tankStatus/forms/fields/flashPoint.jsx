import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class FlashPoint extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_flashpoint: value.tank_flashpoint
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Flash point">{decorator("tank_flashpoint")(<InputNumber />)}</Form.Item>;
  }
}
