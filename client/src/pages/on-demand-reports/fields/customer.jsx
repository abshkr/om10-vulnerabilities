import React from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { ON_DEMAND_REPORTS } from 'api';

const Customer = ({ form, enabled, supplier }) => {
  const { data: options, isValidating } = useSWR(`${ON_DEMAND_REPORTS.CUSTOMERS}?supplier=${supplier}`);

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.customer')}`);
      }
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      form={form}
      name="customer"
      label={t('fields.customer')}
      rules={[{ required: enabled, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={!enabled}
        optionFilterProp="children"
        placeholder={t('placeholder.selectCustomer')}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Customer;
