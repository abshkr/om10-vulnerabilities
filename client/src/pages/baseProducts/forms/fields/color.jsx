import React, { Component } from "react";
import { Form } from "antd";
import { CompactPicker } from "react-color";

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
      <div style={{ height: 200 }}>
        <Form.Item label="Base Product Color">
          <CompactPicker color={!!color ? color : value.base_color} onChangeComplete={value => change(value.hex)} />
        </Form.Item>
      </div>
    );
  }
}
