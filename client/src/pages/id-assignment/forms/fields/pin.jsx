import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Pin = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_pin: value.kya_pin,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="kya_pin" label={t('fields.pin')}>
      <Input type="password" style={{ width: '100%' }} disabled={true} />
    </Form.Item>
  );
};

export default Pin;
