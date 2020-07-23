import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { DELIVERY_DETAILS } from '../../../../api';
import { Form, Select } from 'antd';

const LoadType = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DELIVERY_DETAILS.LOAD_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.ddLoadTypeName')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_ld_type: String(value.dd_ld_type),
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_ld_type"
      label={t('fields.ddLoadTypeName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        disabled={(pageState==='create')? true : true}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTrspType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.load_type_id}>
            {item.load_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default LoadType;
