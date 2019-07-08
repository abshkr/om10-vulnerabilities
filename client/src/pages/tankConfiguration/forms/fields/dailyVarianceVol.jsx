import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class DailyVarianceVol extends Component {
  handleDataValidation = (rule, value, callback) => {
    if (value && !_.isInteger(parseInt(value))) {
      callback("This value must be a number.");
    }

    if (value && value.length > 126) {
      callback("Value must be under 126 characters.");
    }

    callback();
  };

  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_dtol_volume: value.tank_dtol_volume
      });
    }
  }

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Daily Limit (Volume)">
        {decorator("tank_dtol_volume", {
          initialValue: 0,
          rules: [
            {
              validator: this.handleDataValidation
            }
          ]
        })(<Input addonAfter="Vol" />)}
      </Form.Item>
    );
  }
}
