import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SPECIAL_MOVEMENTS } from 'api';

const codes = {
  0: 'R',
  1: 'D',
  2: 'T',
};

const MovementReason = ({ value, type, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(`${SPECIAL_MOVEMENTS.REASONS}?mr_type=${codes[type]}`);

  return (
    <Form.Item name="mlitm_reason_code" label={t('fields.reasonCode')}>
      <Select
        loading={isValidating}
        showSearch
        allowClear
        dropdownMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value || !type}
        optionFilterProp="children"
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.mr_id}>
            {item.mr_action}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default MovementReason;
