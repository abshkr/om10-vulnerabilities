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
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.movementType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mr_type: value.mr_type,
        //mr_type_name: value.mr_type_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mr_type"
      label={t('fields.movementType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        disabled={value?.mr_status === '2'}
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
