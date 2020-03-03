import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TransportMode = ({ form, value }) => {
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
    <>
      <Form.Item name="mv_tpmode" label={t('fields.transportMode')}>
        <Input
          placeholder={t('placeholder.setTransportMode')}
          style={{ width: '29.5%', marginRight: '0.5%' }}
        />
      </Form.Item>

      <Form.Item name="mv_tpmode_text">
        <Input placeholder={t('placeholder.setTransportModeDescription')} style={{ width: '70%' }} />
      </Form.Item>
    </>
  );
};

export default TransportMode;
