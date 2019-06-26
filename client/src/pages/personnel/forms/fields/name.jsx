import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Name extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_name: value.per_name
      });
    }
  }

  handleValidation = (rule, value, callback) => {
    if (value && value.length > 100) {
      callback("Name must be under 100 characters.");
    }
    callback();
  };

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Name">
        {decorator("per_name", {
          rules: [{ required: true, message: "Please Enter A Name." }, { validator: this.handleValidation }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
