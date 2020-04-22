import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Quantity = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.quantity')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_intended_qty: value.pmv_intended_qty,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="pmv_intended_qty"
      label={t('fields.quantity')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default Quantity;
