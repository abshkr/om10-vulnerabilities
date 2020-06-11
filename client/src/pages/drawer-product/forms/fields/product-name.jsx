import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const ProductName = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const IS_CREATE = !value

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('fields.productName')}`);
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_name: value.prod_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="prod_name" label={t('fields.productName')} rules={[{ required: true, validator: validate }]}>
      <Input></Input>
    </Form.Item>
  );
};

export default ProductName;