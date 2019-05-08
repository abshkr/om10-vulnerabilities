import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class Sulphur extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_sulphur: value.tank_sulphur
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Sulphur (wt%)">{decorator("tank_sulphur")(<InputNumber />)}</Form.Item>;
  }
}
