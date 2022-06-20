import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const Type = ({ form, value, onChange, onSupplier }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ALLOCATIONS.TYPES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.type')}`);
    }

    return Promise.resolve();
  };

  const handleChange = (value) => {
    onChange(value);

    const payload = value === '1' ? 'BaSePrOd' : undefined;

    setFieldsValue({
      alloc_cmpycode: undefined,
      alloc_suppcode: payload,
    });

    if (payload) {
      onSupplier(payload);
    }
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_type: value.alloc_type,
      });

      onChange(value.alloc_type);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item name="alloc_type" label={t('fields.type')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        disabled={!!value}
        allowClear
        showSearch
        onChange={handleChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.acheck_type}>
            {item.acheck_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Type;
