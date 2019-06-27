import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class Title extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        eqpt_title: value.eqpt_title
      });
    }
  }

  handleCodeValidation = (rule, value, callback) => {
    const match = _.find(this.props.data, ["eqpt_title", value]);

    if (value && !!match && !this.props.value) {
      callback("This Base Code already exists.");
    }

    callback();
  };

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Title">
        {decorator("eqpt_title", {
          rules: [{ required: true, message: "Please Enter an Equipment Code" }, { validator: this.handleCodeValidation }]
        })(<Input />)}
      </Form.Item>
    );
  }
}
