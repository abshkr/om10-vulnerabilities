import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { SITE_CONFIGURATION } from 'api';

const Address = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(SITE_CONFIGURATION.TERMINAL_ADDRESSES);

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        term_addr: value.term_addr,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="term_addr" label={t('fields.address')}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        optionFilterProp="children"
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
