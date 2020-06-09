import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { DRAWER_PRODUCTS } from '../../../../api';

const Generic = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DRAWER_PRODUCTS.DANGEROUS_GOODS);

  const handleChange = (value) => {
    setFieldsValue({
      dg_link_id: value,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dg_link_id: value.dg_link_id,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="dg_link_id" label={t('fields.dangerousGoods')} >
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
          <Select.Option key={index} value={item.material}>
            {item.material}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Generic;
