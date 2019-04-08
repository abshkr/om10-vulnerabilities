import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromPID extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        excl_from_pid: value.excl_from_pid
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item>
        {decorator("excl_from_pid", {
          initialValue: false
        })(<Checkbox>Exclude from PID</Checkbox>)}
      </Form.Item>
    );
  }
}
