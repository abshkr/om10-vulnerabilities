import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { AXLE_WEIGHTS } from 'api';

const AxleLimitTypes = ({ form, value, counts }) => {
  const { t } = useTranslation();

  // const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.LIMIT_TYPES);
  const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.AVAIL_LIMIT_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.axleLimitType')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        axle_limit_type_id: value.axle_limit_type_id,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="axle_limit_type_id"
      label={t('fields.axleLimitType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        disabled={!!value}
        showSearch
        placeholder={!value ? t('placeholder.selectAxleLimitType') : null}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option
            key={index}
            value={item.axle_limit_type_id}
            disabled={item.count_axle_groups >= counts}
          >
            {item.axle_limit_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AxleLimitTypes;
