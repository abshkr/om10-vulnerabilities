import React, { Component } from "react";
import { Form, Select } from "antd";

export default class CloseOutBy extends Component {
  state = {
    options: [
      {
        key: "Date Range [Start/End Date]",
        value: false
      },
      {
        key: "Folio Range [Start/End Folio Number]",
        value: true
      }
    ]
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        report_closeout_flag2: value.report_closeout_flag2
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { options } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Closeout Report By">
        {decorator("report_closeout_flag2")(
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
