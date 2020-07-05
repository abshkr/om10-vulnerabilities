import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const OrderDays = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.custOrdDays')}`);
      }
    }

    if (input && input.length > 4) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_ord_days: value.cust_ord_days
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="cust_ord_days" 
      label={t('fields.custOrdDays')} 
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber min={0} max={9999} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default OrderDays;
