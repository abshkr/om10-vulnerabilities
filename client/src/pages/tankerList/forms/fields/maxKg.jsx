import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';

const MaxKg = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        tnkr_max_kg: value.tnkr_max_kg
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 9) {
      callback(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.maxKg')}>
      {getFieldDecorator('tnkr_max_kg', {
        rules: [{ required: false, validator: validate }]
      })(<InputNumber />)}
    </Form.Item>
  );
};

export default MaxKg;
