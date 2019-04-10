import React, { Component } from "react";
import { Form, Input } from "antd";

export default class TagText extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        kya_txt: value.kya_txt
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Physical Tag Text">
        {decorator("kya_txt", {
          rules: [{ required: true, message: "Please Fill the Tag Text" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
