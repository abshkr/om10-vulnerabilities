import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SPECIAL_MOVEMENTS } from 'api';

const MovementType = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(SPECIAL_MOVEMENTS.TYPES);

  return (
    <Form.Item name="mlitm_type" label={t('fields.movementType')}>
      <Select
        loading={isValidating}
        showSearch
        allowClear
        dropdownMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.movitem_type_id}>
            {item.movitem_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default MovementType;
