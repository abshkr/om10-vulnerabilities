import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const BatchCode = ({ form, value, config }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (rule.required && (input === '' || !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${t(config?.siteLabelUser + 'fields.batch')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_batchcode: value.pmv_batchcode,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="pmv_batchcode"
      label={t(config?.siteLabelUser + 'fields.batch')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default BatchCode;
