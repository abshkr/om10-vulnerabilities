import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';

const EmptyWeight = ({ form, value, t, data }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        eqpt_empty_kg: value.eqpt_empty_kg
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 126) {
      callback(`${t('placeholder.maxCharacters')}: 126 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.emptyWeight')}>
      {getFieldDecorator('eqpt_empty_kg', {
        rules: [{ required: false, validator: validate }]
      })(<InputNumber />)}
    </Form.Item>
  );
};

export default EmptyWeight;
