import React, { Component } from "react";
import { Form, InputNumber } from "antd";

export default class EmptyWeight extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        eqpt_empty_kg: value.eqpt_empty_kg
      });
    }
  }

  handleValidation = (rule, value, callback) => {
    callback();
  };

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Empty Weight">
        {decorator("eqpt_empty_kg", {
          rules: [{ validator: this.handleValidation }]
        })(<InputNumber />)}
      </Form.Item>
    );
  }
}
