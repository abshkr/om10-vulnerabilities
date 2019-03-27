import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Channel extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_channel: value.tank_channel
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Channel">
        {decorator("tank_channel", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
