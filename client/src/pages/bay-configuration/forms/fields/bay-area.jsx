import React, { useEffect } from 'react';

import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BAY_CONFIGURATION } from '../../../../api';

const BayArea = ({ form, value, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BAY_CONFIGURATION.AREAS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.bayArea')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        ba_area: value.ba_area,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="ba_area" label={t('fields.bayArea')} rules={[{ required: true, validator: validate }]}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={disabled}
        // onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBayArea') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.area_k}>
            {`${item.area_k} - ${item.area_name}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default BayArea;
