import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Department extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_department: value.per_department
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return <Form.Item label="Department">{decorator("per_department")(<Input />)}</Form.Item>;
  }
}
