import React, { Component } from "react";
import { Form, Select, Col } from "antd";
const { Option } = Select;

export default class Issuer extends Component {
  render() {
    const { edit, issuer, decorator } = this.props;
    return (
      <Col span={6}>
        <Form.Item label="Issuer">
          {decorator("kya_issuer_name", {
            rules: [{ required: true, message: "Please Fill the Issuer" }]
          })(
            <Select disabled={edit}>
              {issuer.map((item, index) => (
                <Option key={index} value={item.cmpy_name}>
                  {item.cmpy_name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
