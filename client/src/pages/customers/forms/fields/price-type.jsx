import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { CUSTOMERS } from '../../../../api';
import { Form, Select } from 'antd';

const PriceType = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(CUSTOMERS.PRICE_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.custPriceType')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_pricetype_id: String(value.cust_pricetype_id),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cust_pricetype_id"
      label={t('fields.custPriceType')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectPricingType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.price_type_id}>
            {item.price_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default PriceType;
