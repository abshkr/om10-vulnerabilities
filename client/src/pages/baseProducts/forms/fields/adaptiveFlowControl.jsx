import React, { Component } from "react";
import { Form, Select } from "antd";

export default class AdaptiveFlowControl extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        flow_control_enabled: value.flow_control_enabled
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;
    const control = ["Enabled", "Disabled"];
    return (
      <Form.Item label="Adaptive Flow Control">
        {decorator("flow_control_enabled", {
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
