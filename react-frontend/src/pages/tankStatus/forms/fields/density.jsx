import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class Density extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_density: value.tank_density
      });
    }
  }

  handleEventChange = changedValue => {
    const { value, setContext } = this.props;
    if (!!value) {
      if (value.tank_density !== String(changedValue)) {
        setContext("tank_density");
      } else {
        setContext(null);
      }
    }
  };

  render() {
    const { decorator, context } = this.props;

    return (
      <Form.Item label="Density">
        {decorator("tank_density", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <InputNumber
            disabled={!!context && context !== "tank_density"}
            onChange={value => this.handleEventChange(value)}
          />
        )}
      </Form.Item>
    );
  }
}
