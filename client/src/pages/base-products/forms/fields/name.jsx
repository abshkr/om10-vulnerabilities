import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.name')}`);
    }

    if (input && input.length > 40) {
      callback(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_name: value.base_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.name')}>
      {getFieldDecorator('base_name', {
        rules: [{ required: true, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default Name;
