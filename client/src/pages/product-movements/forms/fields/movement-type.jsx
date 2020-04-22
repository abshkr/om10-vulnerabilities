import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Radio } from 'antd';

const MovementType = ({ value }) => {
  const { t } = useTranslation();

  return (
    <Form.Item name="pmv_state_name" label={t('fields.movementDetailType')}>
      <Radio.Group buttonStyle="solid" disabled={!!value}>
        <Radio.Button value="NEW">{t('fields.productMovementNew')}</Radio.Button>
        <Radio.Button value="COMPLETE">{t('fields.productMovementComplete')}</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};

export default MovementType;
