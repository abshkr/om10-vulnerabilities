import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { CUSTOMERS } from '../../../../api';
import { Form, Select } from 'antd';

const SaleType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(CUSTOMERS.SALE_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.custSaleType')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_saletype_id: String(value.cust_saletype_id),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cust_saletype_id"
      label={t('fields.custSaleType')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        allowClear={true}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectSaleType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.sale_type_id}>
            {item.sale_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SaleType;
