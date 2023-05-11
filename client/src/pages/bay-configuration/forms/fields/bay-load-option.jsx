import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BAY_CONFIGURATION } from '../../../../api';

const BayLoadOption = ({ form, value, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BAY_CONFIGURATION.BAY_LOAD_OPTIONS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.bayLoadOption')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        ba_load_option: value.ba_load_option,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="ba_load_option"
      label={t('fields.bayLoadOption')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={false}
        // onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBayLoadOption') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.staging_load_option_id}>
            {`${item.staging_load_option_id} - ${item.staging_load_option_name}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BayLoadOption;
