import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const ReasonCode = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.otrCode')}`);
    }

    const len = new TextEncoder().encode(value).length;
    if (value && len > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        otr_code: value.otr_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="otr_code" label={t('fields.otrCode')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={false} />
    </Form.Item>
  );
};

export default ReasonCode;
