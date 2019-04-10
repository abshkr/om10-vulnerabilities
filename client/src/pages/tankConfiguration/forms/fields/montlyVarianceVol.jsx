import React, { Component } from "react";
import { Form, Input } from "antd";

export default class MonthlyVarianceVol extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_mtol_volume: value.tank_mtol_volume
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Monthly Limit (Vol)">
        {decorator("tank_mtol_volume", {
          initialValue: 0
        })(<Input />)}
      </Form.Item>
    );
  }
}
