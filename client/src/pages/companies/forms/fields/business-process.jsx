import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const BusinessProcess = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.businessProcess')}`);
    }

    if (value && value.length > 128) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 128 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mr_action: value.mr_action
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mr_action"
      label={t('fields.businessProcess')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default BusinessProcess;
