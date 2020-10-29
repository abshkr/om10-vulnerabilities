import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { REGEX } from '../../../../constants';

const ProductName = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  // const IS_CREATE = !value

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.productName')}`);
    }

    const regex = new RegExp(REGEX.DOCUMENT);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextDocument')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
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
    <Form.Item
      name="prod_name"
      label={t('fields.productName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input></Input>
    </Form.Item>
  );
};

export default ProductName;
