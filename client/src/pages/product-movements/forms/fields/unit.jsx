import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Radio } from 'antd';

const Unit = ({ form, value }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_unit: value.pmv_unit,
      });
    }
  }, [value]);

  return (
    <Form.Item name="pmv_unit" label={t('fields.unitType')} initialValues={28}>
      <Radio.Group buttonStyle="solid" disabled={!!value} style={{ width: '100%' }}>
        <Radio.Button value="28" style={{ width: '50%' }}>
          {t('fields.litres')}
        </Radio.Button>
        <Radio.Button value="17" style={{ width: '50%' }}>
          {t('fields.kg')}
        </Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};

export default Unit;
