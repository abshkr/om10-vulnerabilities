import React, { Component } from "react";
import { Form, Select, Col } from "antd";
const { Option } = Select;

export default class TimeCode extends Component {
  render() {
    const { decorator } = this.props;
    return (
      <Col span={6}>
        <Form.Item label="Time Code">
          {decorator("kya_timecode")(
            <Select>
              <Option value="AL">AL</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
