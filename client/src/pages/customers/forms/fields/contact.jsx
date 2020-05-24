import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Contact = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    /*
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.custContact')}`);
    }
    */
    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_contact: value.cust_contact
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="cust_contact" label={t('fields.custContact')} rules={[{ required: false, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default Contact;
