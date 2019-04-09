import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromPID extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_excl_from_pid: value.tank_excl_from_pid
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const checked = !!value && value.tank_excl_from_pid === "true" ? "checked" : "unchecked";
    return (
      <Form.Item>
        {decorator("tank_excl_from_pid", { valuePropName: checked })(<Checkbox>Exclude from PID</Checkbox>)}
      </Form.Item>
    );
  }
}
