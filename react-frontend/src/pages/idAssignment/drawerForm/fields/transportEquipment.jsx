import React, { Component } from "react";
import { Input, Form, Col } from "antd";

export default class TransportEquipment extends Component {
  render() {
    const { decorator, values } = this.props;
    const enabled = ["Non Schedulable", "Schedulable"];
    return (
      <Col span={6}>
        <Form.Item label="Transport Equipment">
          {decorator("kya_eqpt_cmpy_name")(
            <Input disabled={values.kya_eqpt_cmpy_name === "" || !enabled.includes(values.kya_type_name)} />
          )}
        </Form.Item>
      </Col>
    );
  }
}
