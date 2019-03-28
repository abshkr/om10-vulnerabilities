import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Id extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        kya_key_no: value.kya_key_no
      });
    }
  }

  render() {
    const { edit, decorator } = this.props;
    return (
      <Form.Item label="Assignment No">
        {decorator("kya_key_no", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input disabled={edit} />)}
      </Form.Item>
    );
  }
}
