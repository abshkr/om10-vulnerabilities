import React, { Component } from "react";
import { Form, Checkbox } from "antd";

export default class ExcludeFromSMG extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_excl_from_special_mv: value.tank_excl_from_special_mv
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const checked = !!value && value.tank_excl_from_special_mv === "true" ? "checked" : "unchecked";
    return (
      <Form.Item>
        {decorator("tank_excl_from_special_mv", { valuePropName: checked })(
          <Checkbox>Exclude from Special Movement Gain/Loss</Checkbox>
        )}
      </Form.Item>
    );
  }
}
