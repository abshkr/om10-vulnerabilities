import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { PERSONNEL } from '../../../../api';

const Role = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(PERSONNEL.ROLES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.role')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_auth: value.per_auth
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="per_auth" label={t('fields.role')} rules={[{ required: true, validator: validate }]}>
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
    </Form.Item>
  );
};

export default Role;
