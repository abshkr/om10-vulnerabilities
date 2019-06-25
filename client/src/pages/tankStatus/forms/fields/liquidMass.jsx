import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class LiquidMass extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_liquid_kg: value.tank_liquid_kg
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Liquid Mass">{decorator("tank_liquid_kg")(<InputNumber />)}</Form.Item>;
  }
}
