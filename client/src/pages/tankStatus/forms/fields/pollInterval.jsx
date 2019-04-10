import React, { Component } from "react";
import { Form, Input } from "antd";

export default class PollInterval extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_poll_gap: value.tank_poll_gap
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Poll Interval">
        {decorator("tank_poll_gap", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
