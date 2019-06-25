import React, { Component } from "react";
import { Form, Input } from "antd";

export default class SLP extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        slp_id: value.slp_id
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return <Form.Item label="SLP Id">{decorator("slp_id")(<Input />)}</Form.Item>;
  }
}
