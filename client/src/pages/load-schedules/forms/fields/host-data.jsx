import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const HostData = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shl_fleet_data: value.shl_fleet_data,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shl_fleet_data" label={t('fields.hostData')}>
      <Input style={{ width: '100%' }} maxLength={40} />
    </Form.Item>
  );
};

export default HostData;
