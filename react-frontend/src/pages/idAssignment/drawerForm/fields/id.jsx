import React, { Component } from "react";
import { Form, Input, Col } from "antd";
import axios from "axios";

export default class Id extends Component {
  state = {
    id: null
  };

  getIds = () => {
    this.setState({
      id: axios.get(`https://10.1.10.66/api/idassignment/count.php`)
    });
  };

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
