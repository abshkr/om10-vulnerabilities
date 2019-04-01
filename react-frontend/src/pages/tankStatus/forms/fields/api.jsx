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

  handleEventChange = changedValue => {
    const { value, setContext } = this.props;
    if (!!value) {
      console.log(value.tank_api, changedValue);
      if (value.tank_api !== String(changedValue)) {
        setContext("tank_api");
      } else {
        setContext(null);
      }
    }
  };

  render() {
    const { decorator, context } = this.props;

    return (
      <Form.Item label="API">
        {decorator("tank_api", {
          rules: [{ required: true, message: "please enter user name" }]
        })(
          <InputNumber
            disabled={!!context && context !== "tank_api"}
            onChange={value => this.handleEventChange(value)}
          />
        )}
      </Form.Item>
    );
  }
}
