import React, { Component } from "react";
import { Form, Select, Col } from "antd";

export default class OwnerCarrier extends Component {
  render() {
    const { decorator, edit } = this.props;
    const options = ["Owner", "Carrier"];
    return (
      <Col span={6}>
        <Form.Item label="Owner/Carrier">
          {decorator("owner_carrier")(
            <Select disabled={edit}>
              {options.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
