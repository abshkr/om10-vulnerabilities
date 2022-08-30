import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        term_name: value.term_name,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > 49) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 49 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="term_name" label={t('fields.name')} rules={[{ required: false, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default Name;
