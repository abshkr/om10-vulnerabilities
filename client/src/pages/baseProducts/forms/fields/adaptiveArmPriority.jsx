import React, { Component } from 'react';
import { Form, Select } from 'antd';

const options = [
  {
    key: 'LILO',
    value: 'LILO (Last in / Last out)',
  },
  {
    key: 'LIFO',
    value: 'LIFO (Last in / First out)',
  },
];

export default class AdaptiveArmPriority extends Component {
  componentDidMount() {
    const { value, setValue } = this.props;

    if (!!value) {
      setValue({
        afc_priority: value.afc_priority,
      });
    }
  }

  render() {
    const { decorator } = this.props;
    const { Option } = Select;
    return (
      <Form.Item label="Adaptive Arm Priority">
        {decorator('afc_priority', {
          rules: [{ required: false, message: 'Please Select An Arm Priority.' }],
        })(
          <Select>
            {options.map((item, index) => (
              <Option key={index} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    );
  }
}
