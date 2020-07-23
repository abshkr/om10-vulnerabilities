import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { SITE_ACCESS_DEVICES } from '../../../../api';

const DeviceSecurity = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(SITE_ACCESS_DEVICES.ROLES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.deviceSecurity')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        adv_security: value.adv_security
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="adv_security"
      label={t('fields.deviceSecurity')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        // placeholder={!value ? t('placeholder.selectDeviceSecurity') : null}
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

export default DeviceSecurity;
