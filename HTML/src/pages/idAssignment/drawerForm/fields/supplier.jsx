import React, { Component } from "react";
import { Select, Form, Col } from "antd";

export default class Supplier extends Component {
  render() {
    const { decorator, values, supplier } = this.props;
    const enabled = ["TANKER", "COMBINATION"];
    return (
      <Col span={6}>
        <Form.Item label="Supplier">
          {decorator("kya_supp_name")(
            <Select disabled={values.kya_supp_name === "" || !enabled.includes(values.kya_type_name)}>
              {supplier.map((item, index) => (
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
