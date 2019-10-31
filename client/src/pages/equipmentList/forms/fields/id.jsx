import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const Id = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_id: value.eqpt_id
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.id')}>
      {getFieldDecorator('eqpt_id', {
        rules: [{ required: false }]
      })(<Input disabled />)}
    </Form.Item>
  );
};

export default Id;
