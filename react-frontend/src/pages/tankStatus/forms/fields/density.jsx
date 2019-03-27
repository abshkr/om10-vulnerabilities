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

  render() {
    const { decorator, setContext, context } = this.props;

    return (
      <Form.Item label="Density">
        {decorator("tank_density", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <InputNumber
            disabled={!!context && context !== "tank_density"}
            onMouseEnter={() => setContext("tank_density")}
            onMouseLeave={() => setContext(null)}
          />
        )}
      </Form.Item>
    );
  }
}
