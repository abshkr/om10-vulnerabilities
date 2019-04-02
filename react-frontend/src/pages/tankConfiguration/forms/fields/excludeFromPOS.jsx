import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromPOS extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_dtol_volume: value.tank_dtol_volume
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Exclude from POS">
        {decorator("tank_dtol_volume", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Checkbox />)}
      </Form.Item>
    );
  }
}
