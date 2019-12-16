import React, { Component } from 'react';
import { Form, InputNumber } from 'antd';

export default class UserHLevel extends Component {
  componentDidMount() {
    const { value, form } = this.props;

    const { setFieldsValue } = form;

    if (!!value) {
      setFieldsValue({
        tank_uh_level: value.tank_uh_level,
      });
    }
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form.Item label="User H (mm)">
        {getFieldDecorator('tank_uh_level')(<InputNumber min={0} style={{ width: '100%' }} />)}
      </Form.Item>
    );
  }
}
