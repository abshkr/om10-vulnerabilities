import React, { Component } from "react";
import { Form, Select } from "antd";

export default class Type extends Component {
  state = {
    options: [
      {
        key: "None",
        value: "N"
      },
      {
        key: "Daily",
        value: "D"
      },
      {
        key: "Weekly",
        value: "W"
      },
      {
        key: "Monthly",
        value: "M"
      }
    ]
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_type: value.report_type
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { options } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Type">
        {decorator("report_type", {
          rules: [{ required: true, message: "Please Select a Report Type" }]
        })(
          <Select>
            {options.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.key}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
