import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BASE_PRODUCTS } from '../../../../api';

const GainLossUnit = ({ form, value, tankCount }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BASE_PRODUCTS.STOCK_UNITS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.baseProdGainLossUnitMode')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_gainloss_unit: value.base_gainloss_unit,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="base_gainloss_unit"
      label={
        t('fields.baseProdGainLossUnitMode') +
        (!value ? '' : ' (' + t('fields.totalBaseTanks') + ': ' + String(tankCount) + ')')
      }
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        // disabled={value && tankCount > 0}
        // onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectGainLossUnitMode') : null}
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

export default GainLossUnit;
