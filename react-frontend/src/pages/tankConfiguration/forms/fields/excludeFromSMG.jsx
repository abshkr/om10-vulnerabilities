import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromSMG extends Component {
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
      <Form.Item label="Exclude from Special Movement Gain/Loss">
        {decorator("tank_dtol_volume", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<Checkbox />)}
      </Form.Item>
    );
  }
}
