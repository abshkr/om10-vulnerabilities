import React, { Component } from "react";
import { Form, Input } from "antd";

export default class MonthlyVariancePercent extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_mtol_percent: value.tank_mtol_percent
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Monthly Limit (%)">
        {decorator("tank_mtol_percent", {
          initialValue: 0
        })(<Input />)}
      </Form.Item>
    );
  }
}
