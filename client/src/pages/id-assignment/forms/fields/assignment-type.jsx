import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const AssignmentType = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ID_ASSIGNMENT.ASSIGNMENT_TYPES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.assignmentType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_type: value.kya_type
      });

      onChange(value.kya_type);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="kya_type"
      label={t('fields.assignmentType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        disabled={!!value}
        loading={isValidating}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectAssignmentType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.type_id}>
            {item.type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AssignmentType;
