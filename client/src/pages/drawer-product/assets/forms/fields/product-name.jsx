import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const ProductName = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const IS_CREATE = !value

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_name: value.prod_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="prod_name" label={t('fields.productName')} >
      <Input disabled></Input>
    </Form.Item>
  );
};

export default ProductName;
