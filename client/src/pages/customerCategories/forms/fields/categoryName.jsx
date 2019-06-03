import React, { Component } from "react";
import { Form, Input } from "antd";

export default class CategoryName extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        category_name: value.category_name
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Category Name">
        {decorator("category_name", {
          rules: [{ required: true, message: "Please Enter a Category Name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
