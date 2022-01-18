import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const BusinessProcess = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.businessProcessReason')}`);
    }

    const len = new TextEncoder().encode(value).length;
    if (value && len > 128) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 128 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mr_action: value.mr_action,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mr_action"
      label={t('fields.businessProcessReason')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={value?.mr_status === '2'} />
    </Form.Item>
  );
};

export default BusinessProcess;
