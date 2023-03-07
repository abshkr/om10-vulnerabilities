import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Radio } from 'antd';

const Monitor = ({ form, value, srcType, dstType }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_monitor: value.pmv_monitor,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      const option = srcType === '3' ? 'S' : dstType === '3' ? 'D' : '';
      setFieldsValue({
        pmv_monitor: option,
      });
    }
  }, [value, srcType, dstType, setFieldsValue]);

  return (
    <Form.Item
      name="pmv_monitor"
      label={t('fields.monitoring')}
      initialValues={srcType === '3' ? 'S' : dstType === '3' ? 'D' : ''}
    >
      <Radio.Group buttonStyle="solid" disabled={!!value} style={{ width: '100%' }}>
        <Radio.Button value="S" style={{ width: '50%' }} disabled={srcType !== '3' && dstType === '3'}>
          {t('fields.source')}
        </Radio.Button>
        <Radio.Button value="D" style={{ width: '50%' }} disabled={srcType === '3' && dstType !== '3'}>
          {t('fields.destination')}
        </Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};

export default Monitor;
