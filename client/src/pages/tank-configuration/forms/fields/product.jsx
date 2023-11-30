import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { TANKS } from '../../../../api';

const Product = ({ form, value, onChange, disabled }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(TANKS.BASE_LIST);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.baseProduct')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_base: value.tank_base,
      });

      onChange(value.tank_base);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="tank_base"
      label={t('fields.baseProduct')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        onChange={onChange}
        disabled={disabled}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBaseProduct') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.base_code}>
            {item.base_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Product;
