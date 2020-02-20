import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { PERSONNEL } from '../../../../api';

const Role = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(PERSONNEL.ROLES);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.role')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_auth: value.per_auth
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.role')}>
      {getFieldDecorator('per_auth', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectRole') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.role_id}>
              {item.auth_level_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Role;
