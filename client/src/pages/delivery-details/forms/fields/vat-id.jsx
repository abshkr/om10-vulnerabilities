import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import axios from 'axios';

const VatId = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddVatId')}`);
      }
    }
    
    if (input && input.length > 10) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 10 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_vat_id: value.dd_vat_id,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="dd_vat_id" 
      label={t('fields.ddVatId')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input 
        style={{ width: '100%' }} 
        disabled={pageState==='create'? false : false}
      />
    </Form.Item>
  );
};

export default VatId;
