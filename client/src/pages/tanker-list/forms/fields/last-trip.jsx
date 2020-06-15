import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';

const LastTrip = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_last_trip: value.tnkr_last_trip,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="tnkr_last_trip" label={t('fields.lastTrip')}>
      <InputNumber disabled style={{ width: '100%' }} />
    </Form.Item>
  );
};

export default LastTrip;
