import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class Code extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        per_code: value.per_code
      });
    }
  }

  handleValidation = (rule, value, callback) => {
    const match = _.find(this.props.data, ["per_code", value]);

    if (value && !!match && !this.props.value) {
      callback("This Code already exists.");
    }

    if (value && value.length > 12) {
      callback("Code must be under 12 characters.");
    }
    callback();
  };

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Code">
        {decorator("per_code", {
          rules: [{ required: true, message: "Please Enter The Code." }, { validator: this.handleValidation }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
