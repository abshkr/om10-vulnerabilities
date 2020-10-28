import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_name: value.tnkr_name,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="tnkr_name" label={t('fields.name')} rules={[{ required: false, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default Name;
