import React, { Component } from "react";
import { Form, Select, Col } from "antd";
const { Option } = Select;

export default class AssignmenType extends Component {
  render() {
    const { edit, assignment, decorator } = this.props;
    return (
      <Col span={6}>
        <Form.Item label="Assignment Type">
          {decorator("kya_type_name", {
            rules: [{ required: true, message: "Please Select a Type" }]
          })(
            <Select disabled={edit}>
              {assignment.map((item, index) => (
                <Option key={index} value={item.type_name}>
                  {item.type_name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
