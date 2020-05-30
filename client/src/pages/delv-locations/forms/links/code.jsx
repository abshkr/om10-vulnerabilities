import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const LocationCode = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_code: value.delv_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
      }
    }

    if (input && input.length > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item 
      name="delv_code" 
      label={t('fields.code')} 
      rules={[{ required: false, validator: validate }]}>
      <Input disabled={true} />
    </Form.Item>
  );
};

export default LocationCode;
