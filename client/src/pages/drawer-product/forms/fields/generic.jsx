import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { DRAWER_PRODUCTS } from '../../../../api';

const Generic = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DRAWER_PRODUCTS.GENERICS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.genericName')}`);
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

  return (
    <Form.Item name="prod_class" label={t('fields.genericName')} rules={[{ required: true, validator: validate }]}>
      <Select
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
            {item.gen_prod_code}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Generic;
