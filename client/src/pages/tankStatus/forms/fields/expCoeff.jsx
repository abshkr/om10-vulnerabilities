import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class ExpCoeff extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_api: value.tank_api
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Exp.Coeff">{decorator("tank_api")(<InputNumber />)}</Form.Item>;
  }
}
