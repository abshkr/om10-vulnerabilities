import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { ALLOCATIONS } from '../../../../api';

const LockType = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(ALLOCATIONS.LOCKS);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.lockType')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        alloc_type: value.alloc_type
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.lockType')}>
      {getFieldDecorator('alloc_type', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectLockType') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.alloc_lock_id}>
              {item.alloc_lock_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default LockType;
