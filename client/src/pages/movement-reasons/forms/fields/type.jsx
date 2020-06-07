import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { MOVEMENT_REASONS } from '../../../../api';

const Type = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(MOVEMENT_REASONS.TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.type')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mr_type: value.mr_type
        //mr_type_name: value.mr_type_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item 
      name="mr_type" 
      label={t('fields.type')} 
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.movitem_type_code}>
            {item.movitem_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Type;
