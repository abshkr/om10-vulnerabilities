import React, { useEffect } from 'react';

import { Form, InputNumber } from 'antd';

const MaxLevel = ({ form, value }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_max_level: value.tank_max_level,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={'Tank Max Level (mm)'}>
      {getFieldDecorator('tank_max_level')(<InputNumber style={{ width: '100%' }} />)}
    </Form.Item>
  );
};

export default MaxLevel;
