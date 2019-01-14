import React, { Component } from "react";
import { Form, Input, Col } from "antd";

export default class DateCreated extends Component {
  render() {
    const { decorator } = this.props;
    return (
      <Col span={6}>
        <Form.Item label="Date Created">{decorator("kya_key_created")(<Input disabled={true} />)}</Form.Item>
      </Col>
    );
  }
}
