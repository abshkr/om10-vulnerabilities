import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TransportMode = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_tpmode: value.mv_tpmode,
        mv_tpmode_text: value.mv_tpmode_text
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.transportMode')} labelCol="">
      <span>
        {getFieldDecorator('mv_tpmode')(
          <Input
            placeholder={t('placeholder.setTransportMode')}
            style={{ width: '29.5%', marginRight: '0.5%' }}
          />
        )}
        {getFieldDecorator('mv_tpmode_text')(
          <Input placeholder={t('placeholder.setTransportModeDescription')} style={{ width: '70%' }} />
        )}
      </span>
    </Form.Item>
  );
};

export default TransportMode;
