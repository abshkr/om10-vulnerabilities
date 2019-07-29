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
    const { decorator, value } = this.props;
    const { states } = this.state;
    const { Option } = Select;
    const disabledOptions = ["Inactive", "Active"];
    return (
      <Form.Item label="Status">
        {decorator("per_lock")(
          <Select
            loading={states === null}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {!!states &&
              states.map((item, index) => (
                <Option key={index} value={item.key} disabled={disabledOptions.includes(item.value) && !!value}>
                  {item.value}
                </Option>
              ))}
          </Select>
        )}
      </Form.Item>
    );
  }
}
