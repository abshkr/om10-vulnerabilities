import React, { Component } from "react";
import { Form, Input, Col } from "antd";

export default class Pin extends Component {
  render() {
    const { decorator } = this.props;
    return (
      <Col span={6}>
        <Form.Item label="Pin">{decorator("kya_pin")(<Input disabled={true} />)}</Form.Item>
      </Col>
    );
  }
}
