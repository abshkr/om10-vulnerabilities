import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromSMG extends Component {
  render() {
    const { decorator, value } = this.props;
    const state = !!value && value.tank_excl_from_special_mv === "true" ? true : false;
    return (
      <Form.Item>
        {decorator("tank_excl_from_special_mv", { valuePropName: "checked", initialValue: state })(
          <Checkbox>Exclude from Special Movement Gain/Loss</Checkbox>
        )}
      </Form.Item>
    );
  }
}
