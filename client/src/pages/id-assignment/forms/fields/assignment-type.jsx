import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const AssignmentType = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ID_ASSIGNMENT.ASSIGNMENT_TYPES);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.assignmentType')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_type: value.kya_type
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.assignmentType')}>
      {getFieldDecorator('kya_type', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          disabled={!!value}
          loading={isValidating}
          showSearch
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
      )}
    </Form.Item>
  );
};

export default AssignmentType;
