import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MANUAL_TRANSACTIONS } from 'api';

const Carrier = ({ form, customer, onChange, disabled, config }) => {
  const { t } = useTranslation();

  const { data: carriers, isValidating } = useSWR(`${MANUAL_TRANSACTIONS.CARRIERS}?customer=${customer}`);

  return (
    <Form.Item name="carrier" label={t('fields.mtDataCarrier')} rules={[{ required: true }]}>
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        showSearch
        disabled={disabled}
        loading={isValidating}
        onChange={onChange}
        optionFilterProp="children"
        placeholder={t('placeholder.selectCarrier')}
        filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {carriers?.records?.map((item, index) => (
        <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_code + ' - ' + item.cmpy_name}
        </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Carrier;
