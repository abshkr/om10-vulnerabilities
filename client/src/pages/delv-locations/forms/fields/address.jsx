import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { PARTNERS } from 'api';
import { Form, Select } from 'antd';

const Address = ({ form, value, reload }) => {
  const { t } = useTranslation();

  const { data: options, isValidating, revalidate } = useSWR(PARTNERS.ADDRESSES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.delvAddr')} [${input}]`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_addr: value.delv_addr_code,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (reload && revalidate) {
      revalidate();
    }
  }, [reload, revalidate]);

  return (
    <Form.Item
      name="delv_addr"
      label={t('fields.delvAddr')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
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
