import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Auxiliary extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_drv_aux: value.tank_drv_aux
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Auxiliary">{decorator("tank_drv_aux")(<Input />)}</Form.Item>;
  }
}
