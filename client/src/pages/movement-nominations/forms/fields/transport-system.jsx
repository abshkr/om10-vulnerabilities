import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TransportSystem = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_tpsystem: value.mv_tpsystem
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="mv_tpsystem" label={t('fields.transportSystem')} labelCol="">
      <Input placeholder={t('placeholder.setTransportSystem')} maxLength={40}/>
    </Form.Item>
  );
};

export default TransportSystem;
