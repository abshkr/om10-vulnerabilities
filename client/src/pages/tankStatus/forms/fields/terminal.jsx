import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Terminal extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_sitename: value.tank_sitename
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return <Form.Item label="Terminal">{decorator("tank_sitename")(<Input disabled />)}</Form.Item>;
  }
}
