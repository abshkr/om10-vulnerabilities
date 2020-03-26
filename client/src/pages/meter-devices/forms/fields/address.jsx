import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Address = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.address')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mtd_address: value.mtd_address
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mtd_address"
      label={`${t('fields.address')} (0-9)`}
      rules={[{ required: true, validator: validate }]}
    >
      <InputNumber disabled={!!value} min={0} max={9} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default Address;
