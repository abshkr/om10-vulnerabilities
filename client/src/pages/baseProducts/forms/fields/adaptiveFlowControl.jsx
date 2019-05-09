import React, { Component } from "react";
import { Form, Select } from "antd";

export default class AdaptiveFlowControl extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        afc_enabled: value.afc_enabled
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;
    const control = [{ key: "Y", value: "Enabled" }, { key: "N", value: "Disabled" }];
    return (
      <Form.Item label="Adaptive Flow Control">
        {decorator("afc_enabled", {
          rules: [{ required: false, message: "please enter user name" }]
        })(
          <Select>
            {control.map((item, index) => (
              <Option key={index} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
