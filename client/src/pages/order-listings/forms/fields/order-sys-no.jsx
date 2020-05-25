import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
//import axios from 'axios';

//import { ORDER_LISTINGS } from '../../../../api';

const OrderSysNo = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_sys_no: value.order_sys_no,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="order_sys_no" label={t('fields.orderSysNo')}>
      <InputNumber style={{ width: '100%' }} disabled={true} />
    </Form.Item>
  );
};

export default OrderSysNo;
