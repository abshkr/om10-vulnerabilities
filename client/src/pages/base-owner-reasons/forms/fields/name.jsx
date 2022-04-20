import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const ReasonText = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.otrText')}`);
    }

    const len = new TextEncoder().encode(value).length;
    if (value && len > 200) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 200 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        otr_text: value.otr_text,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="otr_text" label={t('fields.otrText')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={false} />
    </Form.Item>
  );
};

export default ReasonText;
