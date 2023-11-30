import React from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { ON_DEMAND_REPORTS } from 'api';

const Carrier = ({ form, enabled, parent }) => {
  const { data: options, isValidating } = useSWR(`${ON_DEMAND_REPORTS.CARRIERS}?parent=${parent}`);

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.carrier')}`);
      }
    }

    return Promise.resolve();
  };

  // const onCarrierChange = (value) => {
  //   onChange(value);
  // };

  return (
    <Form.Item
      form={form}
      name="carrier"
      label={t('fields.carrier')}
      rules={[{ required: enabled, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={!enabled}
        // onChange={onCarrierChange}
        optionFilterProp="children"
        placeholder={t('placeholder.selectCarrier')}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Carrier;
