import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BASE_PRODUCTS } from '../../../../api';

const StockUnit = ({ form, value, owners }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BASE_PRODUCTS.STOCK_UNITS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.baseProdStockUnitMode')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_stock_unit: value.base_stock_unit,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="base_stock_unit"
      label={
        t('fields.baseProdStockUnitMode') +
        (!value ? '' : ' (' + t('fields.totalBaseOwnerships') + ': ' + String(owners?.length) + ')')
      }
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={value && owners?.length > 0}
        // onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectStockUnitMode') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.stock_unit_id}>
            {item.stock_unit_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default StockUnit;
