import React, { Component } from "react";
import { Form, Input } from "antd";

export default class LevelAlarmState extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_lvlalarm_desc: value.tank_lvlalarm_desc
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Level Alarm State">
        {decorator("tank_lvlalarm_desc", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input disabled />)}
      </Form.Item>
    );
  }
}
