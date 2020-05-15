import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Shift = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_shift: value.shls_shift,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shls_shift" label={t('fields.shift')}>
      <InputNumber min={0} max={9} style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default Shift;
