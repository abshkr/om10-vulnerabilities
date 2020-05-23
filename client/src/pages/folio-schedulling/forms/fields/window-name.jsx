import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Select } from 'antd';
import _ from 'lodash';
import useSWR from 'swr';

const WindowName = ({ form, value, onTypeChange }) => {
  const { t } = useTranslation();
  const IS_CREATING = value["seq"] === undefined;

  const { setFieldsValue } = form;
  const { Option } = Select;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        window_name: value.window_name,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.folioExceptionType')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item 
      name="window_name" 
      label={t('fields.folioExceptionType')} 
      rules={[{ required: true, validator: validate }]}
    >
      <Select 
        // defaultValue="DATE_WINDOW" 
        disabled={!IS_CREATING}
        onChange={onTypeChange}
      >
        {IS_CREATING ? 
          <Option value="ONCE_WINDOW" disabled >Once off Date</Option> :
          <Option value="ONCE_WINDOW" >Once off Date</Option>
          }
        <Option value="WEEK_WINDOW">Day of Week</Option>
        <Option value="MONTH_WINDOW">Date of Month</Option>
        <Option value="DATE_YEAR_WINDOW">Date of Year</Option>
        <Option value="YEAR_WINDOW">Day of Year</Option>
      </Select>
    </Form.Item>
  );
};

export default WindowName;
