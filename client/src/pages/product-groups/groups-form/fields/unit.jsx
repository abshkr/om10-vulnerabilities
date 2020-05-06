import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { PRODUCT_GROUPS } from '../../../../api';

const Unit = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(PRODUCT_GROUPS.UNITS);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.unit')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pgr_unit: value.pgr_unit,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="pgr_unit" label={t('fields.unit')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectUnit') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.unit_id}>
            {item.description}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Unit;
