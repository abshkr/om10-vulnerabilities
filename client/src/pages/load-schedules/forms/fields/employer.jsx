import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { LOAD_SCHEDULES } from '../../../../api';

const Employer = ({ form, value, onChange, enabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(LOAD_SCHEDULES.EMPLOYERS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.employer')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        driver_company: value.driver_company,
      });

      onChange(value.driver_company);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="driver_company"
      label={t('fields.employer')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        disabled={!value ? false : !enabled}
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEmployer') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
