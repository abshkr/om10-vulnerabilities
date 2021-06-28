import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const EqptCode = () => {
  const { t } = useTranslation();

  return (
    <Form.Item name="eqpt_code" label={t('fields.code')}>
      <Input />
    </Form.Item>
  );
};

export default EqptCode;
