import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import axios from 'axios';

import { ORDER_LISTINGS } from '../../../../api';

const OrderCustNo = ({ form, value, supplier }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_cust_no: value.order_cust_no,
      });
    } else if (supplier) {
      axios
        .get(ORDER_LISTINGS.NEXT_CUST_ORDER, {
          params: {
            order_supp_code: supplier,
          },
        })
        .then((res) => {
          const custOrdNo = res.data?.records[0]?.order_cust_no;

          setFieldsValue({
            order_cust_no: custOrdNo,
          });
        });
    }
  }, [value, setFieldsValue, supplier]);

  return (
    <Form.Item name="order_cust_no" label={t('fields.orderCustNo')}>
      <InputNumber style={{ width: '100%' }} disabled={!supplier} />
    </Form.Item>
  );
};

export default OrderCustNo;
