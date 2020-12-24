import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { AXLE_WEIGHTS } from 'api';

const AxleGroups = ({ form, value, counts }) => {
  const { t } = useTranslation();

  // const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.AXLE_GROUPS);
  const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.AVAIL_AXLE_GROUPS);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.axleGroup')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        axle_group_id: value.axle_group_id,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="axle_group_id"
      label={t('fields.axleGroup')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        disabled={!!value}
        showSearch
        placeholder={!value ? t('placeholder.selectAxleGroup') : null}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.axle_group_id} disabled={item.count_limit_types >= counts}>
            {item.axle_group_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AxleGroups;
