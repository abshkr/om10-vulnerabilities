import React, { Component } from "react";
import { Form, Input } from "antd";

export default class DailyVariancePercent extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_dtol_percent: value.tank_dtol_percent
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Daily Limit (%)">
        {decorator("tank_dtol_percent", {
          initialValue: 0
        })(<Input />)}
      </Form.Item>
    );
  }
}
