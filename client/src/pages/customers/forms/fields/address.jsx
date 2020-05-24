import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { ADDRESSES } from '../../../../api';
import { Form, Select } from 'antd';

const Address = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(ADDRESSES.READ);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.custAddress')} [${input}]`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_addr_code: value.cust_addr_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cust_addr_code"
      label={t('fields.custAddress')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectAddress') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.db_address_key}>
            {item.address_text}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Address;