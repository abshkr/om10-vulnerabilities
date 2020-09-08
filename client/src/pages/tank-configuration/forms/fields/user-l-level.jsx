import React, { Component } from 'react';
import { Form, InputNumber } from 'antd';

export default class UserLLevel extends Component {
  componentDidMount() {
    const { value, form } = this.props;

    const { setFieldsValue } = form;

    if (!!value) {
      setFieldsValue({
        tank_ul_level: value.tank_ul_level,
      });
    }
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form.Item label="User L (mm)">
        {getFieldDecorator('tank_ul_level')(<InputNumber min={0} style={{ width: '100%' }} />)}
      </Form.Item>
    );
  }
}
