import React, { Component } from "react";
import { Select, Form, Col } from "antd";

export default class Personnel extends Component {
  render() {
    const { decorator, values, personnel } = this.props;
    const enabled = ["SUPERVISOR", "Personnel", "COMBINATION"];
    return (
      <Col span={6}>
        <Form.Item label="Personnel">
          {decorator("kya_psnl_name")(
            <Select disabled={values.kya_psnl_name === "" || !enabled.includes(values.kya_type_name)}>
              {personnel.map((item, index) => (
                <Select.Option key={index} value={item.per_code}>
                  {item.per_name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
