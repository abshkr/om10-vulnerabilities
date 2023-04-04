import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const PsnlCode = () => {
  const { t } = useTranslation();

  return (
    <Form.Item name="psnl_code" label={t('fields.code')}>
      <Input />
    </Form.Item>
  );
};

export default PsnlCode;
