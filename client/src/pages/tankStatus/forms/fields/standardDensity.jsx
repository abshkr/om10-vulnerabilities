import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class StandardDensity extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_amb_density: value.tank_amb_density
      });
    }
  }

  handleEventChange = changedValue => {
    const { value, setContext } = this.props;
    if (!!value) {
      if (value.standard_density !== String(changedValue)) {
        setContext("standard_density");
      } else {
        setContext(null);
      }
    }
  };

  render() {
    const { decorator, context } = this.props;

    return (
      <Form.Item label="Standard Density">
        {decorator("tank_amb_density", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <InputNumber
            disabled={!!context && context !== "standard_density"}
            onChange={value => this.handleEventChange(value)}
          />
        )}
      </Form.Item>
    );
  }
}
