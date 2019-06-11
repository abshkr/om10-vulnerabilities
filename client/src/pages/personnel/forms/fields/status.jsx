import React, { Component } from "react";
import { Form, Select } from "antd";

export default class Status extends Component {
  state = {
    states: [
      {
        key: "N",
        value: "Inactive"
      },
      {
        key: "Y",
        value: "Active"
      },
      {
        key: "L",
        value: "Locked"
      }
    ]
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        per_lock: value.per_lock
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { states } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Status">
        {decorator("per_lock")(
          <Select loading={states === null}>
            {!!states &&
              states.map((item, index) => (
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
