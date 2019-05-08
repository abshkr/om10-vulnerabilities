import React, { Component } from "react";
import { Form, Input } from "antd";

export default class InterfaceType extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_drv_type: value.tank_drv_type
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Interface Type">{decorator("tank_drv_type")(<Input />)}</Form.Item>;
  }
}
