import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const CreditLimit = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    /*
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.custCrdLimit')}`);
    }
    */
    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_crd_limit: value.cust_crd_limit
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="cust_crd_limit" label={t('fields.custCrdLimit')} rules={[{ required: false, validator: validate }]}>
      <InputNumber defaultValue={0} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default CreditLimit;
