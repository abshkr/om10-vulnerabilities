import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TnkrCode = () => {
  const { t } = useTranslation();

  return (
    <Form.Item name="tnkr_code" label={t('fields.code')}>
      <Input />
    </Form.Item>
  );
};

export default TnkrCode;
