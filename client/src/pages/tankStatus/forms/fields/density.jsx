import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class Density extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_density: value.tank_density
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Density">{decorator("tank_density")(<InputNumber onChange={value => this.handleEventChange(value)} />)}</Form.Item>;
  }
}
