import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const OrderRefCode = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.orderRefCode')}`);
      }
    }

    if (input && input.length > 32) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 32 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_ref_code: value.order_ref_code
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="order_ref_code" 
      label={t('fields.orderRefCode')} 
      rules={[{ required: false, validator: validate }]}
    >
      <Input 
        disabled={(pageState==='create'||pageState==='edit')? false : true}
      />
    </Form.Item>
  );
};

export default OrderRefCode;
