import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const ShipTo = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_ship_to_num: value.order_ship_to_num,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_ship_to_num" label={t('fields.orderShipTo')}>
      <Input 
        disabled={true}
      >
      </Input>
    </Form.Item>
  );
};

export default ShipTo;
