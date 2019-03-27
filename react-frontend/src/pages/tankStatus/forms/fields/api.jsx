import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class API extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        tank_api: value.tank_api
      });
    }
  }

  render() {
    const { decorator, setContext, context } = this.props;

    return (
      <Form.Item label="API">
        {decorator("tank_api", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <InputNumber
            disabled={!!context && context !== "tank_api"}
            onMouseEnter={() => setContext("tank_api")}
            onMouseLeave={() => setContext(null)}
          />
        )}
      </Form.Item>
    );
  }
}
