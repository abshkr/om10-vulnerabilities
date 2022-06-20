import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SPECIAL_MOVEMENTS } from 'api';

const StatusSerach = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(SPECIAL_MOVEMENTS.STATUS);

  return (
    <Form.Item name="mlitm_status" label={t('fields.movementStatus')}>
      <Select
        loading={isValidating}
        allowClear
        showSearch
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        // placeholder={!value ? t('placeholder.selectSupplier') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.mlitm_status}>
            {item.mv_status_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default StatusSerach;
