import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Pin extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        kya_pin: value.kya_pin
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return <Form.Item label="Pin">{decorator("kya_pin")(<Input disabled={true} />)}</Form.Item>;
  }
}
