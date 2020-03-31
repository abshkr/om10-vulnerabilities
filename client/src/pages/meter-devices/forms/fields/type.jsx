import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { METER_DEVICES } from '../../../../api';

const Type = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(METER_DEVICES.TYPES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.businessProcess')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mtd_type: value.mtd_type
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="mtd_type" label={t('fields.type')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        showSearch
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.mtd_id}>
            {item.mtd_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Type;
