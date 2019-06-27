import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class Code extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        eqpt_code: value.eqpt_code
      });
    }
  }

  handleCodeValidation = (rule, value, callback) => {
    const match = _.find(this.props.data, ["eqpt_code", value]);

    if (value && !!match && !this.props.value) {
      callback("This Base Code already exists.");
    }

    callback();
  };

  render() {
    const { decorator, value } = this.props;
    return (
      <Form.Item label="Code">
        {decorator("eqpt_code", {
          rules: [{ required: true, message: "Please Enter an Equipment Code" }, { validator: this.handleCodeValidation }]
        })(<Input disabled={!!value} />)}
      </Form.Item>
    );
  }
}
