import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { REGEX } from '../../../../constants';

const ProductCode = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const IS_CREATE = !value;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.productCode')}`);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumeric')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 36) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 36 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_code: value.prod_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="prod_code"
      label={t('fields.productCode')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!IS_CREATE}></Input>
    </Form.Item>
  );
};

export default ProductCode;
