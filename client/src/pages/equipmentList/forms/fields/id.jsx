import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class Id extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        eqpt_id: value.eqpt_id
      });
    }
  }

  handleCodeValidation = (rule, value, callback) => {
    const match = _.find(this.props.data, ["eqpt_id", value]);

    if (value && !!match && !this.props.value) {
      callback("This Base Code already exists.");
    }

    callback();
  };

  render() {
    const { decorator } = this.props;
    return (
      <Form.Item label="Id">
        {decorator("eqpt_id", {
          rules: [
            { required: true, message: "Please Enter an Equipment Code" },
            { validator: this.handleCodeValidation }
          ]
        })(<Input disabled />)}
      </Form.Item>
    );
  }
}
