import React, { Component } from "react";
import { Select, Form, Col } from "antd";

export default class Employer extends Component {
  render() {
    const { decorator, values, employer } = this.props;
    const enabled = ["SUPERVISOR", "Personnel", "COMBINATION"];
    return (
      <Col span={6}>
        <Form.Item label="Employer">
          {decorator("kya_cust_name")(
            <Select disabled={values.kya_draw_name === "" || !enabled.includes(values.kya_type_name)}>
              {employer.map((item, index) => (
                <Select.Option key={index} value={item.cmpy_code}>
                  {item.cmpy_name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
