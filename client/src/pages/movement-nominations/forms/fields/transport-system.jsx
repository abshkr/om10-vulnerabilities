import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TransportSystem = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_tpmode: value.mv_tpmode,
        mv_tpmode_text: value.mv_tpmode_text
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="mv_tpmode" label={t('fields.transportSystem')} labelCol="">
      <Input placeholder={t('placeholder.setTransportSystem')} />
    </Form.Item>
  );
};

export default TransportSystem;
