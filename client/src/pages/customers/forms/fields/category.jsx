import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { CUSTOMER_CATEGORIES } from '../../../../api';
import { Form, Select } from 'antd';

const Category = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(CUSTOMER_CATEGORIES.READ);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.custCategory')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_ctgr_code: value.cust_ctgr_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cust_ctgr_code"
      label={t('fields.custCategory')}
      rules={[{ required: false }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCustomerCategory') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.category_code}>
            {item.category_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Category;
