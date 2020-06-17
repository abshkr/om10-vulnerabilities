import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TankerSearch = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="tnkr_code"
      label={t('fields.tanker')}
    >
      <Input></Input>
    </Form.Item>
  );
};

export default TankerSearch;
