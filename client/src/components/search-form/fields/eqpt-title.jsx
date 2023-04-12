import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const EqptTitle = () => {
  const { t } = useTranslation();

  return (
    <Form.Item name="eqpt_title" label={t('fields.title')}>
      <Input />
    </Form.Item>
  );
};

export default EqptTitle;
