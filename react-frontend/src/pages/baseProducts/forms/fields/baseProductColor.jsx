import React, { Component } from "react";
import { Form } from "antd";
import { ChromePicker } from "react-color";

export default class BaseProductColor extends Component {
  componentWillUnmount() {
    const { value, reset } = this.props;
    if (!!value) {
      reset();
    }
  }

  render() {
    const { change, value, color } = this.props;

    return (
      <div>
        <Form.Item label="Base Product Color">
          <ChromePicker
            color={!!color ? color : value.base_color}
            onChangeComplete={value => change(value.hex)}
          />
        </Form.Item>
      </div>
    );
  }
}
