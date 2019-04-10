import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromPOS extends Component {
  render() {
    const { decorator, value } = this.props;
    const state = !!value && value.tank_exc_pds;
    return (
      <Form.Item>
        {decorator("tank_exc_pds", { valuePropName: "checked", initialValue: state })(
          <Checkbox>Exclude from PDS</Checkbox>
        )}
      </Form.Item>
    );
  }
}
