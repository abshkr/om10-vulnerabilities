import React, { Component } from "react";
import { Select, Form, Col } from "antd";

export default class Drawer extends Component {
  render() {
    const { decorator, values, drawer } = this.props;
    const enabled = ["Personnel", "COMBINATION"];
    return (
      <Col span={6}>
        <Form.Item label="Drawer">
          {decorator("kya_draw_name")(
            <Select disabled={values.kya_draw_name === "" || !enabled.includes(values.kya_type_name)}>
              {drawer.map((item, index) => (
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
