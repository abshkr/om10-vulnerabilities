import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BAY_CONFIGURATION } from '../../../../api';

const BayLoadType = ({ form, value, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BAY_CONFIGURATION.BAY_LOAD_TYPES);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.bayLoadType')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        ba_phystype: value.ba_phystype,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="ba_phystype"
      label={t('fields.bayLoadType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={disabled}
        // onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBayLoadType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.bay_type_id}>
            {`${item.bay_type_id} - ${item.bay_type_desc}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BayLoadType;
