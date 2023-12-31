import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { DRAWER_PRODUCTS } from 'api';

const DrawerCompany = ({ form, value, onChange }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DRAWER_PRODUCTS.DRAWERS);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.drawer')}`);
    }

    return Promise.resolve();
  };

  const handleChange = (value) => {
    setFieldsValue({
      prod_cmpycode: value,
    });
    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_cmpycode: value.prod_cmpycode,
      });
      if (onChange) {
        onChange(value.prod_cmpycode);
      }
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="prod_cmpycode"
      label={t('fields.drawer')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        disabled={!!value}
        showSearch
        onChange={handleChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDrawer') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DrawerCompany;
