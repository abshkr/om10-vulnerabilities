import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const Period = ({ form, value, lockType }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ALLOCATIONS.PERIOD);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.resolve(`${t('validate.select')} ─ ${t('fields.lockType')}`);
    }

    return Promise.reject();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_period: String(value.alloc_period),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="alloc_period"
      label={t('fields.period')}
      rules={[{ required: String(lockType) === '3', validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        disabled={String(lockType) !== '3'}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.setPeriod') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.alloc_period_id}>
            {item.alloc_period_name||' '}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Period;
