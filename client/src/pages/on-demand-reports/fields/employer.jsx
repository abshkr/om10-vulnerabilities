import React from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { ON_DEMAND_REPORTS } from 'api';

const Employer = ({ form, enabled, parent }) => {
  const { data: options, isValidating } = useSWR(`${ON_DEMAND_REPORTS.EMPLOYERS}?parent=${parent}`);

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.employer')}`);
      }
    }

    return Promise.resolve();
  };

  // const onEmployerChange = (value) => {
  //   onChange(value);
  // };

  return (
    <Form.Item
      form={form}
      name="employer"
      label={t('fields.employer')}
      rules={[{ required: enabled, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={!enabled}
        // onChange={onEmployerChange}
        optionFilterProp="children"
        placeholder={t('placeholder.selectEmployer')}
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

export default Employer;
