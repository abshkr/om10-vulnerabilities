import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_name: value.tank_name
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 30) {
      callback(`${t('placeholder.maxCharacters')}: 30 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.name')}>
      {getFieldDecorator('tank_name', {
        rules: [{ required: false, validator: validate }]
      })(<Input />)}
    </Form.Item>
  );
};

export default Name;
