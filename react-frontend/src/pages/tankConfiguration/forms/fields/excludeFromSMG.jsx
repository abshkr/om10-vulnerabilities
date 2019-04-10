import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromSMG extends Component {
  render() {
    const { decorator, value } = this.props;
    const state = !!value && value.tank_exc_spmv;
    return (
      <Form.Item>
        {decorator("tank_exc_spmv", { valuePropName: "checked", initialValue: state })(
          <Checkbox>Exclude from Special Movement Gain/Loss</Checkbox>
        )}
      </Form.Item>
    );
  }
}
