import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { CUSTOMERS } from '../../../../api';
import { Form, Select } from 'antd';

const Location = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(CUSTOMERS.DELV_LOCATIONS);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.custDelvLoc')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cust_delv_code: value.cust_delv_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cust_delv_code"
      label={t('fields.custDelvLoc')}
      rules={[{ required: false }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDeliveryLocation') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.delv_code}>
            {item.delv_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Location;