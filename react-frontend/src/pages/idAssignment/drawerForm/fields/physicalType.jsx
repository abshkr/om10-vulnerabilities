import React, { Component } from "react";
import { Form, Select, Col } from "antd";

const { Option } = Select;

export default class PhysicalType extends Component {
  state = {
    isLoading: false
  };

  render() {
    const { physicalType, decorator } = this.props;
    return (
      <Col span={6}>
        <Form.Item label="Physical Type">
          {decorator("kya_phys_name", {
            rules: [{ required: true, message: "Please Select a Type" }]
          })(
            <Select>
              {physicalType.map((item, index) => (
                <Option key={index} value={item.key_phys_name}>
                  {item.key_phys_name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
