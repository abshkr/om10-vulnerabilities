import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { INVENTORY_REQUESTS } from '../../../../api';

const Period = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(INVENTORY_REQUESTS.PERIOD_TYPES);

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.periodRequest')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tkrq_period: value.tkrq_period,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="tkrq_period"
      label={t('fields.periodRequest')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectPeriod') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.rq_period_id}>
            {item.rq_period_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Period;
