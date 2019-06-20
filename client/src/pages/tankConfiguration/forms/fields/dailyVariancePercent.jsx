import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class DailyVariancePercent extends Component {
  handleDataValidation = (rule, value, callback) => {
    if (value && !_.isInteger(parseInt(value))) {
      callback("This value must be a number.");
    }

    if (value && parseInt(value) < -100) {
      callback("Percentage must be above -100.");
    }

    if (value && parseInt(value) > 100) {
      callback("Percentage must be below 100.");
    }

    callback();
  };

  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_dtol_percent: value.tank_dtol_percent
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Daily Limit">
        {decorator("tank_dtol_percent", {
          initialValue: 0,
          rules: [
            {
              validator: this.handleDataValidation
            }
          ]
        })(<Input addonAfter="%" />)}
      </Form.Item>
    );
  }
}
