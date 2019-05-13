import React, { Component } from "react";
import { Form, Select } from "antd";

export default class AdaptiveArmPriority extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        afc_priority: value.afc_priority
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;
    const control = ["LILO (Last in / Last out)", "LIFO (Last in / First out)"];
    return (
      <Form.Item label="Adaptive Arm Priority">
        {decorator("afc_priority", {
          rules: [{ required: false, message: "please enter user name" }]
        })(
          <Select>
            {control.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
