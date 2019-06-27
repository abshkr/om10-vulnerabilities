import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class PullingLimit extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        eqpt_max_gross: value.eqpt_max_gross
      });
    }
  }

  handleValidation = (rule, value, callback) => {
    callback();
  };

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Pulling Limit">
        {decorator("eqpt_max_gross", {
          rules: [{ validator: this.handleValidation }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
