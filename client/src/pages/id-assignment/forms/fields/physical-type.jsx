import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const PhysicalType = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ID_ASSIGNMENT.PHYSICAL_TYPES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.physicalType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_phys_type: value.kya_phys_type,
      });

      onChange(value.kya_phys_type);
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="kya_phys_type"
      label={t('fields.physicalType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectPhysicalType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.key_phys_id}>
            {item.key_phys_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default PhysicalType;
