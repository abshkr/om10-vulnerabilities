import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Phone = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.delvPhone')}`);
    }

    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_phone: value.delv_phone
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="delv_phone" label={t('fields.delvPhone')} rules={[{ required: false, validator: null }]}>
      <Input />
    </Form.Item>
  );
};

export default Phone;
