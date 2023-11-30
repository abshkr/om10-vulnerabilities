import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BAY_CONFIGURATION } from '../../../../api';

const BayType = ({ form, value, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BAY_CONFIGURATION.BAY_TYPES);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.bayType')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        ba_type: value.ba_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="ba_type" label={t('fields.bayType')} rules={[{ required: true, validator: validate }]}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={disabled}
        // onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBayType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.ba_type}>
            {`${item.ba_type} - ${item.description}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BayType;
