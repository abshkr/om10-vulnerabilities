import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

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
    const match = _.find(this.props.data, ["tank_code", value]);

    if (value && !!match && !this.props.value) {
      callback("This Tank Code already exists.");
    }

    if (value && value.length > 6) {
      callback("Tank Code must be under 6 characters.");
    }
    callback();
  };

  render() {
    const { decorator, value } = this.props;

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
        })(<Input disabled={!!value} />)}
      </Form.Item>
    );
  }
}
