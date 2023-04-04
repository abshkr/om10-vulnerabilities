import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const PsnlName = () => {
  const { t } = useTranslation();

  return (
    <Form.Item name="psnl_name" label={t('fields.name')}>
      <Input />
    </Form.Item>
  );
};

export default PsnlName;
