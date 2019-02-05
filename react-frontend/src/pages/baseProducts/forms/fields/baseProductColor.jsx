import React, { Component } from "react";
import { Form } from "antd";
import { ChromePicker } from "react-color";

export default class BaseProductColor extends Component {
  render() {
    const { change, color } = this.props;

    return (
      <div>
        <Form.Item label="Base Product Color">
          <ChromePicker color={color} onChangeComplete={value => change(value.hex)} />
        </Form.Item>
      </div>
    );
  }
}
