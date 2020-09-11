import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { DRAWER_PRODUCTS } from '../../../../api';

const Generic = ({ form, value, flag, setFlag }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  // use this flag to trigger the refresh when generic names changed in its manager window.
  const { data: options, isValidating } = useSWR(`${DRAWER_PRODUCTS.GENERICS}?flag=${flag}`);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.prodClass')}`);
    }

    return Promise.resolve();
  };

  const handleChange = (value) => {
    setFieldsValue({
      prod_class: value,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_class: value.prod_class,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (flag) {
      setFlag(false);
    }
  }, [options, setFlag]);

  return (
    <Form.Item name="prod_class" label={t('fields.prodClass')} rules={[{ required: true, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        onChange={handleChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectGenericName') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.gen_prod_code}>
            {item.gen_prod_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Generic;
