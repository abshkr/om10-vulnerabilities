import React, { Component } from "react";
import { Form, Select } from "antd";

const options = [
  {
    value: "Y",
    key: "Yes"
  },
  {
    value: "N",
    key: "No"
  }
];

export default class Lock extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        prntr_lock: value.prntr_lock
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;

    return (
      <Form.Item label="Lock">
        {decorator("prntr_lock", {
          rules: [{ required: true, message: "Please Select An Area" }]
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
