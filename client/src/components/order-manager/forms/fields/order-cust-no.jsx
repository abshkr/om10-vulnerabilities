import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';
import useSWR from 'swr';
import api, { ORDER_LISTINGS } from '../../../../api';
import { validatorStatus } from 'utils';

const OrderCustNo = ({ form, value, supplier, pageState, digits }) => {
  const { t } = useTranslation();

  const { setFieldsValue, validateFields } = form;

  const [custOrder, setCustOrder] = useState(0);
  const [existed, setExisted] = useState(false);

  const {
    data,
    isValidating,
    mutate: revalidate,
  } = useSWR(`${ORDER_LISTINGS.CHECK_CUST_ORDER}?order_cust_no=${custOrder}`, {
    refreshInterval: 0,
  });

  const onChange = (v) => {
    setExisted(false);
    setCustOrder(v);
    revalidate();
  };

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.orderCustNo')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > digits) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${digits} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    if (existed && !value) {
      return Promise.reject(`${t('descriptions.alreadyExists')}`);
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

  useEffect(() => {
    if (data) {
      setExisted(!data?.records[0]?.is_valid);
    }
  }, [data]);

  useEffect(() => {
    if (custOrder) {
      validateFields(['order_cust_no']);
    }
  }, [existed, custOrder]);

  const status = validatorStatus(isValidating, existed);

  return (
    <Form.Item
      name="order_cust_no"
      label={t('fields.orderCustNo')}
      rules={[{ required: true, validator: validate }]}
      hasFeedback
      validateStatus={custOrder ? status : null}
      shouldUpdate
    >
      <InputNumber
        style={{ width: '100%' }}
        //disabled={!supplier}
        disabled={true}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default OrderCustNo;
