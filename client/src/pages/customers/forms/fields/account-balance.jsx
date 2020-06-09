import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const AccountBalance = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.custBalance')}`);
      }
    }

    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_balance: value.cust_balance
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="cust_balance" 
      label={t('fields.custBalance')} 
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default AccountBalance;
