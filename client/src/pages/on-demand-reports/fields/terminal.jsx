import React from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { ON_DEMAND_REPORTS } from 'api';

const Terminal = ({ form }) => {
  const { data: options, isValidating } = useSWR(ON_DEMAND_REPORTS.TERMINALS);

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.terminal')}`);
    }

    return Promise.resolve();
  };

  // const onCarrierChange = (value) => {
  //   onChange(value);
  // };

  return (
    <Form.Item
      form={form}
      name="terminal"
      label={t('fields.terminal')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        // onChange={onCarrierChange}
        optionFilterProp="children"
        placeholder={t('placeholder.selectTerminal')}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.term_code}>
            {item.term_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Terminal;
