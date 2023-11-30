import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { CUSTOMER_CATEGORIES } from '../../../../api';
import { Form, Select } from 'antd';

const CustomerCategory = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(CUSTOMER_CATEGORIES.READ);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.delvCustCategory')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_cust_catgcode: value.delv_cust_catgcode,
      });

      onChange(value.delv_cust_catgcode);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="delv_cust_catgcode"
      label={t('fields.delvCustCategory')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        onChange={onChange}
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

export default CustomerCategory;
