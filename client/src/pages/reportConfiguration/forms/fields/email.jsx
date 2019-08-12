import React, { Component } from "react";
import { Form, Input } from "antd";

export default class Email extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_cmpyemail: value.report_cmpyemail
      });
    }
  }

  handleCodeValidation = (rule, value, callback) => {
    callback();
  };

  render() {
    const { decorator, getValue } = this.props;

    const status = getValue("report_canemail");
    const enabled = !!status ? status : false;

    return (
      <Form.Item label="Company Email">
        {decorator("report_cmpyemail", {
          rules: [
            { required: enabled, message: "Please Enter An Email" },
            { validator: this.handleCodeValidation }
          ]
        })(<Input disabled={!enabled} />)}
      </Form.Item>
    );
  }
}
