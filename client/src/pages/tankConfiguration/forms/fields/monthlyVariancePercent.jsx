import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class MonthlyVariancePercent extends Component {
  handleDataValidation = (rule, value, callback) => {
    if (value && !_.isInteger(parseInt(value))) {
      callback("This value must be a number.");
    }
    callback();
  };

  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_mtol_percent: value.tank_mtol_percent
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Monthly Limit">
        {decorator("tank_mtol_percent", {
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
