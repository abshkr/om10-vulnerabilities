import React, { Component } from "react";
import { Form, Input } from "antd";

export default class TankCode extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_code: value.tank_code
      });
    }
  }

  handleTankCodeValidation = (rule, value, callback) => {
    if (value && value.length > 6) {
      callback("Tank Code must be under 6 characters.");
    }
    callback();
  };

  render() {
    const { decorator, disabled } = this.props;

    return (
      <Form.Item label="Tank Code">
        {decorator("tank_code", {
          rules: [
            {
              required: true,
              message: "Please enter a Tank Code."
            },
            {
              validator: this.handleTankCodeValidation
            }
          ]
        })(<Input disabled={disabled} />)}
      </Form.Item>
    );
  }
}
