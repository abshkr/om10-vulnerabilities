import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class BaseProductCode extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        base_code: value.base_code
      });
    }
  }

  handleCodeValidation = (rule, value, callback) => {
    const match = _.find(this.props.data, ["base_code", value]);

    if (value && !!match && !this.props.value) {
      callback("This Base Code already exists.");
    }

    callback();
  };

  render() {
    const { decorator, value } = this.props;
    return (
      <Form.Item label="Base Product Code">
        {decorator("base_code", {
          rules: [{ required: true, message: "Please Enter a Base Product Code" }, { validator: this.handleCodeValidation }]
        })(<Input disabled={!!value} />)}
      </Form.Item>
    );
  }
}
