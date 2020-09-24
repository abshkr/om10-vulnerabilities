import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const ProductCode = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  // const IS_CREATE = !value

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_code: value.prod_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="prod_code" label={t('fields.productCode')} >
      <Input disabled></Input>
    </Form.Item>
  );
};

export default ProductCode;
