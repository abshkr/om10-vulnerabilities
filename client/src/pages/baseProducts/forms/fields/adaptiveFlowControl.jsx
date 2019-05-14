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
    const control = [{ key: true, value: "Enabled" }, { key: false, value: "Disabled" }];
    return (
      <Form.Item label="Adaptive Flow Control">
        {decorator("afc_enabled", {
          rules: [{ required: false, message: "Please Select A Flow Control Type" }]
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
