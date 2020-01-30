import React, { useEffect } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { BASE_PRODUCTS } from '../../../../api';

const Group = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(BASE_PRODUCTS.PRODUCT_GROUPS);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_prod_group: value.base_prod_group
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.group')}>
      {getFieldDecorator('base_prod_group')(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectGroup') : null}
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
      )}
    </Form.Item>
  );
};

export default Group;
