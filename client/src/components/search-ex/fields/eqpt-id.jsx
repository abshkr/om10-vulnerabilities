import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const EqptId = () => {
  const { t } = useTranslation();

  return (
    <Form.Item name="eqpt_id" label={t('fields.id')}>
      <Input type="number" />
    </Form.Item>
  );
};

export default EqptId;
