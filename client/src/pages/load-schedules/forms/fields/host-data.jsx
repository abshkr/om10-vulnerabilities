import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const HostData = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const IS_DISABLED = !value ? false : value?.shls_status !== 'NEW SCHEDULE';

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shl_fleet_data: value.shl_fleet_data,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="shl_fleet_data" label={t('fields.hostData')}>
      <Input style={{ width: '100%' }} maxLength={40} disabled={IS_DISABLED} />
    </Form.Item>
  );
};

export default HostData;
