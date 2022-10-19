import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Phone = ({ form, value, isMandatory }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.phone')}`);
      }
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 32) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 32 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_phone: value.per_phone,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="per_phone"
      label={t('fields.phone')}
      rules={[{ required: isMandatory, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default Phone;
