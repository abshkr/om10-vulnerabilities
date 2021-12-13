import React from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const OrderNumber = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
        name="order_cust_no"
        label={t('fields.orderCustNo')}
      >
        <Input type="number" />
      </Form.Item>
  );
};

export default OrderNumber;
