import React, { Component } from "react";
import { Form, Input } from "antd";

export default class CategoryCode extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        category_code: value.category_code
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Category Code">
        {decorator("category_code", {
          rules: [{ required: true, message: "Please Enter a Category Code" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
