import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Radio } from 'antd';

const MovementType = ({ value, onChange}) => {
  const { t } = useTranslation();

  const onMovementTypeChange = (v) => {
    console.log(v);
    onChange(v.target.value);
  }

  return (
    <Form.Item name="pmv_state_name" label={t('fields.movementDetailType')}>
      <Radio.Group buttonStyle="solid" disabled={!!value} onChange={onMovementTypeChange}>
        <Radio.Button value="NEW">{t('fields.productMovementNew')}</Radio.Button>
        <Radio.Button value="COMPLETE">{t('fields.productMovementComplete')}</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};

export default MovementType;
