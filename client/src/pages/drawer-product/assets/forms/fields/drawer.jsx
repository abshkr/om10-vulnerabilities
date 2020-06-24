import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { DRAWER_PRODUCTS } from 'api';

const DrawerCompany = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DRAWER_PRODUCTS.DRAWERS);

  const handleChange = (value) => {
    setFieldsValue({
      prod_cmpycode: value,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_cmpycode: value.prod_cmpycode,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="prod_cmpycode" label={t('fields.drawer')} >
      <Select
        loading={isValidating}
        disabled
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
            {item.cmpy_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DrawerCompany;
