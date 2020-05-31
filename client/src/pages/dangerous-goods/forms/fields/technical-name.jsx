import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const TechnicalName = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.technicalName')}`);
    }

    if (input && input.length > 80) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 80 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        hzcf_name: value.hzcf_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="hzcf_name"
      label={t('fields.technicalName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default TechnicalName;
