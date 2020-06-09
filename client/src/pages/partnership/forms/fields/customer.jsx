import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { PARTNERSHIP } from '../../../../api';

const Customer = ({ form, value, company }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(`${PARTNERSHIP.CUSTOMERS}?supplier=${company}`);

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        partner_cust_acct: value.partner_cust_acct,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="partner_cust_acct"
      label={t('fields.customer')}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCustomer') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cust_acct}>
            {item.cust_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Customer;
