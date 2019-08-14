import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Description extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_desc: value.report_desc
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Description">{decorator("report_desc")(<Input />)}</Form.Item>;
  }
}
