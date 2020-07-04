import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { CUSTOMER_CATEGORIES } from '../../../../api';
import { Form, Select } from 'antd';

const Category = ({ form, value, reload }) => {
  const { t } = useTranslation();

  const { data: options, isValidating, revalidate } = useSWR(CUSTOMER_CATEGORIES.READ);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.custCategory')}`);
      }
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

  useEffect(() => {
    if (reload && revalidate) {
      revalidate();
    }
  }, [reload, revalidate]);

  const handChange = (value) => {
    console.log('selection',value);
    if (value === undefined) {
      setFieldsValue({
        cust_ctgr_code: '',
      });
    }
  }

  return (
    <Form.Item
      name="cust_ctgr_code"
      label={t('fields.custCategory')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        loading={isValidating}
        allowClear
        showSearch
        onChange={handChange}
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
