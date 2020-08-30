import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Poll = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.pollInterval')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mtd_poll: value.mtd_poll
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mtd_poll"
      label={`${t('fields.pollInterval')} (10-9999)`}
      rules={[{ required: true, validator: validate }]}
    >
      <InputNumber min={10} max={9999} style={{ width: '100%', marginBottom: 10 }} />
    </Form.Item>
  );
};

export default Poll;
