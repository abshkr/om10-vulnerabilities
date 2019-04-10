import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromPID extends Component {
  render() {
    const { decorator, value } = this.props;
    const state = !!value && value.tank_exc_pid;
    return (
      <Form.Item>
        {decorator("tank_exc_pid", { valuePropName: "checked", initialValue: state })(
          <Checkbox>Exclude from PID</Checkbox>
        )}
      </Form.Item>
    );
  }
}
