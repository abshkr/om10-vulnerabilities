import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const SoldTo = ({ form, value, supplier, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_sold_to_num: value.order_sold_to_num,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_sold_to_num" label={t('fields.orderSoldTo')}>
      <Input 
        disabled={true}
      >
      </Input>
    </Form.Item>
  );
};

export default SoldTo;
