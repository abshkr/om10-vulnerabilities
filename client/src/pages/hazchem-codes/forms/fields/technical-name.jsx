import React, { useEffect } from 'react';
import { Form, Input } from 'antd';

const TechnicalName = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        hzcf_name: value.hzcf_name,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.technicalName')}`);
    }

    if (input && input.length > 20) {
      callback(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.technicalName')}>
      {getFieldDecorator('hzcf_name', {
        rules: [{ required: true, validator: validate }],
      })(<Input />)}
    </Form.Item>
  );
};

export default TechnicalName;
