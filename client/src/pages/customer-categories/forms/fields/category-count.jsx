import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Form, Input } from 'antd';

const CategoryCount = ({ form, value }) => {
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
    <Form.Item name="category_count" label={t('fields.totalCustomersPerCategory')}>
      <Input disabled={true} />
    </Form.Item>
  );
};

export default CategoryCount;
