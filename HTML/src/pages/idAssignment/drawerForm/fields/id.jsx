import React, { Component } from "react";
import { Form, Input, Col } from "antd";

export default class Id extends Component {
  render() {
    const { edit, id, decorator } = this.props;
    return (
      <Col span={6}>
        <Form.Item label="Assignment No" hasFeedback={!edit} validateStatus={!!id ? "success" : "validating"}>
          {decorator("kya_key_no", {
            rules: [{ required: true, message: "please enter user name" }]
          })(<Input disabled={edit} />)}
        </Form.Item>
      </Col>
    );
  }
}
