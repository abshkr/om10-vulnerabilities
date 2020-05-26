import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';

import { DRAWER_PRODUCTS } from '../../../../api';

const Group = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DRAWER_PRODUCTS.PRODUCT_GROUPS);

  const validate = (rule, input) => {
    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_group: value.prod_group,
      });

      // onChange(value.prod_cmpycode);
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="prod_group" label={t('fields.productGroup')} rules={[{ validator: validate }]}>
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectProductGroup') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.pgr_code}>
            {item.pgr_text}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Group;
