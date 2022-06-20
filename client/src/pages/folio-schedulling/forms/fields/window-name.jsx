import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Select } from 'antd';
import _ from 'lodash';
import useSWR from 'swr';

const WindowName = ({ form, value, onTypeChange }) => {
  const { t } = useTranslation();
  const IS_CREATING = value['seq'] === undefined;

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
        dropdownMatchSelectWidth={false}
        allowClear
        // defaultValue="DATE_WINDOW"
        disabled={!IS_CREATING}
        onChange={onTypeChange}
      >
        {/* {IS_CREATING ? 
          <Option value="ONCE_WINDOW" disabled >Once off Date</Option> :
          <Option value="ONCE_WINDOW" >Once off Date</Option>
          } */}
        <Option value="ONCE_WINDOW">{t('fields.folioPlannerRulesOnceWindow')}</Option>
        <Option value="WEEK_WINDOW">{t('fields.folioPlannerRulesWeekWindow')}</Option>
        <Option value="MONTH_WINDOW">{t('fields.folioPlannerRulesMonthWindow')}</Option>
        <Option value="DATE_YEAR_WINDOW">{t('fields.folioPlannerRulesDateYearWindow')}</Option>
        <Option value="YEAR_WINDOW">{t('fields.folioPlannerRulesYearWindow')}</Option>
      </Select>
    </Form.Item>
  );
};

export default WindowName;
