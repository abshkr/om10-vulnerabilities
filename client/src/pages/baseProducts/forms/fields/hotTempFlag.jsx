import React, { Component } from "react";
import { Form, Select } from "antd";

export default class HotTempFlag extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        base_limit_preset_ht: value.base_limit_preset_ht
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;
    const flags = [
      {
        value: "0",
        name: "Disabled"
      },
      {
        value: "1",
        name: "Enabled"
      }
    ];

    return (
      <Form.Item label="Limit Preset Mass Quantity to Capacity">
        {decorator("base_limit_preset_ht")(
          <Select>
            {flags.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
