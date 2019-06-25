import React, { Component } from "react";
import { Input, Form } from "antd";

export default class TransportEquipment extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        kya_eqpt_cmpy_name: value.kya_eqpt_cmpy_name
      });
    }
  }

  render() {
    const { decorator, value } = this.props;
    const enabled = ["Non Schedulable", "Schedulable"];
    return (
      <Form.Item label="Transport Equipment">
        {decorator("kya_eqpt_cmpy_name")(
          <Input disabled={value.kya_eqpt_cmpy_name === "" || !enabled.includes(value.kya_type_name)} />
        )}
      </Form.Item>
    );
  }
}
