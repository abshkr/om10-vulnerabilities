import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import axios from 'axios';

const CustomCode = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddCustomCode')}`);
      }
    }
    
    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_custom_code: value.dd_custom_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="dd_custom_code" 
      label={t('fields.ddCustomCode')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input 
        style={{ width: '100%' }} 
        disabled={pageState==='create'? false : false}
      />
    </Form.Item>
  );
};

export default CustomCode;
