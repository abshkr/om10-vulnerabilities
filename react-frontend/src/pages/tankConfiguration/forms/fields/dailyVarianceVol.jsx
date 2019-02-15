import React, { Component } from "react";
import { Form, Input } from "antd";

export default class DailyVarianceVol extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_dtol_volume: value.tank_dtol_volume
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Daily Variance Limit (Vol)">
        {decorator("tank_dtol_volume", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
