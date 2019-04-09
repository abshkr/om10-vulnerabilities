import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromPOS extends Component {
  render() {
    const { decorator, value } = this.props;
    const state = !!value && value.tank_excl_from_pds === "true" ? true : false;
    return (
      <Form.Item>
        {decorator("tank_excl_from_pds", { valuePropName: "checked", initialValue: state })(
          <Checkbox>Exclude from PDS</Checkbox>
        )}
      </Form.Item>
    );
  }
}
