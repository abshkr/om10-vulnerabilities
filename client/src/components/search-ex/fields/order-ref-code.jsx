import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const OrderRefCode = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
        name="order_ref_code"
        label={t('fields.orderRefCode')}
      >
        <Input />
      </Form.Item>
  );
};

export default OrderRefCode;
