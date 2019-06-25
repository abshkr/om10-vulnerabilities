import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class AmbientVolume extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_amb_vol: value.tank_amb_vol
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Ambient Volume">{decorator("tank_amb_vol")(<InputNumber />)}</Form.Item>;
  }
}
