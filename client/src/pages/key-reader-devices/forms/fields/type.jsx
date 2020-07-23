import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { KEY_READER_DEVICES } from '../../../../api';

const Type = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(KEY_READER_DEVICES.TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.type')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        krdc_type: value.krdc_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="krdc_type" label={t('fields.type')} rules={[{ required: true, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
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
          <Select.Option key={index} value={item.id}>
            {item.reader_type}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Type;
