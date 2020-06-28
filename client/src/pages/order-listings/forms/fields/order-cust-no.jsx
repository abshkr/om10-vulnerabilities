import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

import api, { ORDER_LISTINGS } from '../../../../api';

const OrderCustNo = ({ form, value, supplier, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.orderCustNo')}`);
    }
    
    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_cust_no: value.order_cust_no,
      });
    } else if (supplier) {
      api
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
    <Form.Item 
      name="order_cust_no" 
      label={t('fields.orderCustNo')}
      rules={[{ required: true, validator: validate }]}
    >
      <InputNumber 
        style={{ width: '100%' }} 
        //disabled={!supplier} 
        disabled={(pageState==='create'&&!!supplier)? false : true}
      />
    </Form.Item>
  );
};

export default OrderCustNo;
