import React, { Component } from "react";
import { Select, Form, Col } from "antd";

export default class Role extends Component {
  render() {
    const { decorator, values, role } = this.props;
    const enabled = ["SUPERVISOR", "Personnel", "COMBINATION"];
    return (
      <Col span={6}>
        <Form.Item label="Role">
          {decorator("kya_role_name")(
            <Select disabled={values.kya_role_name === "" || !enabled.includes(values.kya_type_name)}>
              {role.map((item, index) => (
                <Select.Option key={index} value={item.role_id}>
                  {item.role_name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }
}
