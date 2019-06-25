import React, { Component } from "react";
import { Input, Form } from "antd";

export default class EquipmentCarrier extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        kya_etyp_name: value.kya_etyp_name
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const enabled = ["Non Schedulable", "Schedulable"];
    return (
      <Form.Item label="Equipment Carrier">
        {decorator("kya_etyp_name")(
          <Input disabled={value.kya_etyp_name === "" || !enabled.includes(value.kya_type_name)} />
        )}
      </Form.Item>
    );
  }
}
