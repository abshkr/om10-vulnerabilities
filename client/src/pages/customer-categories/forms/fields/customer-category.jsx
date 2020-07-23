import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Form, Select } from 'antd';

const CustomerCategory = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        category_count: value.category_count
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="category_count" label={t('fields.customerCategory')}>
      <Select
        dropdownMatchSelectWidth={false}
        showSearch
        disabled={!value}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {[].map((item, index) => (
          <Select.Option key={index} value={item.ld_type_code}>
            {item.ld_type_text}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CustomerCategory;
