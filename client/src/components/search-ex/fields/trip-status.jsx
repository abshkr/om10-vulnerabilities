import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from 'api';

const StatusSerach = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.STATUS);

  return (
    <Form.Item name="trip_status" label={t('fields.schdStatus')}>
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
          <Select.Option key={index} value={item.status_code}>
            {item.status_text}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default StatusSerach;
