import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_name: value.tank_name
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 30) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 30 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="tank_name" label={t('fields.name')} rules={[{ required: false, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default Name;
