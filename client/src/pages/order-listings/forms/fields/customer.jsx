import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { ORDER_LISTINGS } from '../../../../api';

const Customer = ({ form, value, supplier, onChange, pageState }) => {
  const { setFieldsValue, getFieldValue } = form;

  const { t } = useTranslation();

  //const { data: options, isValidating } = useSWR(ORDER_LISTINGS.CUST_COMPANYS);
  const { data: options, isValidating } = useSWR(`${ORDER_LISTINGS.SUPP_CUSTOMERS}?supplier=${supplier}`, {
    refreshInterval: 0,
  });

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.orderCustAcnt')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        order_cust_acnt: value.order_cust_acnt,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value && options?.records) {
      const account = getFieldValue('order_cust_acnt');
      const item = _.find(options?.records, (o) => o.cust_acnt === account);
      if (!item) {
        setFieldsValue({
          order_cust_acnt: undefined,
        });
        if (onChange) {
          onChange(undefined);
        }
      } else {
        setFieldsValue({
          order_cust_acnt: account,
        });
        if (onChange) {
          onChange(account);
        }
      }
    }
  }, [value, options, setFieldsValue, getFieldValue, onChange]);

  return (
    <Form.Item
      name="order_cust_acnt"
      label={t('fields.custCompany')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        //disabled={!!value || !supplier}
        disabled={pageState === 'create' && !!supplier ? false : true}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCustomerAccount') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cust_acnt}>
            {item.cust_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Customer;
