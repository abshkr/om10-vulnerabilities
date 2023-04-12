import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TnkrName = () => {
  const { t } = useTranslation();

  return (
    <Form.Item name="tnkr_name" label={t('fields.name')}>
      <Input />
    </Form.Item>
  );
};

export default TnkrName;
