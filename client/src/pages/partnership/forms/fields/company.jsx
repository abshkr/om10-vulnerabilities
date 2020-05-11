import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { PARTNERSHIP } from '../../../../api';

const Company = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(PARTNERSHIP.SUPPLIERS);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.company')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        partner_cmpy_code: value.partner_cmpy_code,
      });

      onChange(value.partner_cmpy_code);
    }
  }, [value, setFieldsValue, onChange]);

  const handleChange = (value) => {
    setFieldsValue({
      partner_cust_acct: undefined,
      partner: undefined,
    });

    onChange(value);
  };
  return (
    <Form.Item
      name="partner_cmpy_code"
      label={t('fields.company')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        onChange={handleChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCompany') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Company;
