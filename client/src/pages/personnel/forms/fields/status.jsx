import React, { Component } from "react";
import { Form, Select } from "antd";

export default class Status extends Component {
  state = {
    states: [
      {
        key: "0",
        value: "Inactive"
      },
      {
        key: "1",
        value: "Active"
      },
      {
        key: "2",
        value: "Locked"
      }
    ]
  };

  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        user_status_flag: value.user_status_flag
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { states } = this.state;
    const { Option } = Select;

    return (
      <Form.Item label="Status">
        {decorator("user_status_flag")(
          <Select
            loading={states === null}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
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
