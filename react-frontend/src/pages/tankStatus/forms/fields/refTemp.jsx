import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class RefTemp extends Component {
  state = {
    temp: "15c"
  };

  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        ref_temp: this.state.temp
      });
    }
  }

  render() {
    const { decorator } = this.props;

    return (
      <Form.Item label="Ref Temp">
        {decorator("ref_temp", {
          rules: [{ required: true, message: "please enter user name" }]
        })(<InputNumber disabled />)}
      </Form.Item>
    );
  }
}
