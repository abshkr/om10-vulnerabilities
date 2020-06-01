import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const CreditDays = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.custCrdDays')}`);
      }
    }

    if (input && input.length > 2) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 2 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_crd_days: value.cust_crd_days
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="cust_crd_days" 
      label={t('fields.custCrdDays')} 
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber min={0} max={99} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default CreditDays;
