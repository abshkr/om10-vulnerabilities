import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ORDER_LISTINGS } from 'api';

const OrderCustomer = ({ value, supplier, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(`${ORDER_LISTINGS.SUPP_CUSTOMERS}?supplier=${supplier}`, {
    refreshInterval: 0,
  });

  return (
    <Form.Item name="order_cust_acnt" label={t('fields.custCompany')}>
      <Select
        loading={isValidating}
        allowClear
        showSearch
        popupMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value}
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

export default OrderCustomer;
