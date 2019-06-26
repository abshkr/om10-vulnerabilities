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

  handleValidation = (rule, value, callback) => {
    if (value && value.length > 100) {
      callback("Department must be under 100 characters.");
    }
    callback();
  };

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Department">
        {decorator("per_department", {
          rules: [{ validator: this.handleValidation }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
