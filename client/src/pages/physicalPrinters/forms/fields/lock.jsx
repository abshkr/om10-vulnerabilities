import React, { Component } from "react";
import { Form, Select } from "antd";

const options = [
  {
    value: "Y",
    key: "Locked"
  },
  {
    value: "N",
    key: "Unlocked"
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
      <Form.Item label="Status">
        {decorator("prntr_lock")(
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
