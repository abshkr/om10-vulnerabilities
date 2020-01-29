import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const Type = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ALLOCATIONS.TYPES);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.type')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_type: value.alloc_type
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.type')}>
      {getFieldDecorator('alloc_type', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          disabled={!!value}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectType') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.acheck_type}>
              {item.acheck_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Type;
