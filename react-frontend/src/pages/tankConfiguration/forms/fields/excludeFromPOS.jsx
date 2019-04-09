import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromPOS extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_excl_from_pds: value.tank_excl_from_pds
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const checked = !!value && value.tank_excl_from_pds === "true" ? "checked" : "unchecked";
    return (
      <Form.Item>
        {decorator("tank_excl_from_pds", { valuePropName: checked })(<Checkbox>Exclude from POS</Checkbox>)}
      </Form.Item>
    );
  }
}
