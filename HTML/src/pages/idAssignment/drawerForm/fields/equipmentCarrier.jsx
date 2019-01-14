import React, { Component } from "react";
import { Input, Form, Col } from "antd";

export default class EquipmentCarrier extends Component {
  render() {
    const { decorator, values } = this.props;
    const enabled = ["Non Schedulable", "Schedulable"];
    return (
      <Col span={6}>
        <Form.Item label="Equipment Carrier">
          {decorator("kya_etyp_name")(
            <Input disabled={values.kya_etyp_name === "" || !enabled.includes(values.kya_type_name)} />
          )}
        </Form.Item>
      </Col>
    );
  }
}
