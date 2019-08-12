import React, { Component } from "react";
import { Form, Input } from "antd";
import _ from "lodash";

export default class Area_K extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;
    if (!!value) {
      setValue({
        area_k: value.area_k
      });
    }
  }

  handleValidation = (rule, value, callback) => {
    const match = _.find(this.props.data, ["area_k", value]);
    if (value && !!match && !this.props.value) {
      callback("This Code already exists.");
    }

    if (value && value.length > 12) {
      callback("Code must be under 12 characters.");
    }
    callback();
  };

  render() {
    const { value, decorator } = this.props;

    return (
      <Form.Item label="Area ID">
        {decorator("area_k", {
          rules: [{ required: true, message: "Please set area id" }, { validator: this.handleValidation }]
        })(<Input disabled={!!value} />)}
      </Form.Item>
    );
  }
}
