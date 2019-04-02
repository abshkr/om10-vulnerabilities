import React, { Component } from "react";
import { Form, Input } from "antd";

export default class DateCreated extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        kya_key_created: value.kya_key_created
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Date Created">{decorator("kya_key_created")(<Input disabled={true} />)}</Form.Item>
    );
  }
}
