import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Pin = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_pin: value.kya_pin
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="kya_pin" label={t('fields.pin')}>
      <InputNumber min={0} max={4} style={{ width: '100%' }} disabled={!!value} />
    </Form.Item>
  );
};

export default Pin;
