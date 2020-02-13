import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const PhysicalType = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ID_ASSIGNMENT.PHYSICAL_TYPES);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.physicalType')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_phys_name: value.kya_phys_name
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.physicalType')}>
      {getFieldDecorator('kya_phys_name', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
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
      )}
    </Form.Item>
  );
};

export default PhysicalType;
