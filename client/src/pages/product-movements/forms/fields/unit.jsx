import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Radio } from 'antd';

const Unit = ({ value }) => {
  const { t } = useTranslation();

  return (
    <Form.Item name="pmv_unit_name" label={t('fields.unitType')}>
      <Radio.Group buttonStyle="solid" disabled={!!value}>
        <Radio.Button value="l">{t('fields.litres')}</Radio.Button>
        <Radio.Button value="kg">{t('fields.kg')}</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};

export default Unit;
