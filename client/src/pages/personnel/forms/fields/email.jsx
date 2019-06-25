import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Email extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_email: value.per_email
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return <Form.Item label="Email">{decorator("per_email")(<Input />)}</Form.Item>;
  }
}
