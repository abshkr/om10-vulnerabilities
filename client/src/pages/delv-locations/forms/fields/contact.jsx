import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Contact = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.delvContact')}`);
    }

    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_contact: value.delv_contact
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="delv_contact" label={t('fields.delvContact')} rules={[{ required: false, validator: null }]}>
      <Input />
    </Form.Item>
  );
};

export default Contact;
