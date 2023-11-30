import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { TRANSACTION_LIST } from 'api';

const BayList = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(TRANSACTION_LIST.BAYS);

  return (
    <Form.Item name="bay_code" label={t('fields.bay')}>
      <Select
        loading={isValidating}
        showSearch
        allowClear
        popupMatchSelectWidth={false}
        onChange={onChange}
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBay') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.ba_code}>
            {item.ba_code}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BayList;
