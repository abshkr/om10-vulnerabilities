import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TripSearch = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
        name="trsa_id"
        label={t('fields.transactionNumber')}
      >
        <Input type="number" />
      </Form.Item>
  );
};

export default TripSearch;
