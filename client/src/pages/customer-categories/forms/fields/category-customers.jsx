import React, { useEffect } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { Form, Select } from 'antd';

import { CUSTOMER_CATEGORIES } from '../../../../api';

const CategoryCustomers = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options } = useSWR(
    `${CUSTOMER_CATEGORIES.CUSTOMERS_BY_CATEGORY}?category=${value?.category_code}`
  );

  return (
    <Form.Item name="category_customers" label={t('fields.customersPerCategory')}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        showSearch
        disabled={false}
        optionFilterProp="children"
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

export default CategoryCustomers;
