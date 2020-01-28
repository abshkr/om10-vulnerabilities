import React, { Component } from 'react';
import { Form, Select } from 'antd';

export default class AdaptiveFlowControl extends Component {
  componentDidMount() {
    const { value, form } = this.props;
    const { setFieldsValue } = form;

    if (!!value) {
      setFieldsValue({
        afc_enabled: value.afc_enabled
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const { Option } = Select;
    const control = [
      { key: true, value: 'Enabled' },
      { key: false, value: 'Disabled' }
    ];
    return (
      <Form.Item label="Adaptive Flow Control">
        {getFieldDecorator('afc_enabled', {
          rules: [{ required: false, message: 'Please Select A Flow Control Type' }]
        })(
          <Select>
            {control.map((item, index) => (
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
