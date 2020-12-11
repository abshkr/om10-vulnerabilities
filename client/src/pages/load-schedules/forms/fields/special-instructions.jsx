import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const SpecialInstructions = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.SpecialInstructions')}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 4000) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4000 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_spec_ins: value?.shls_spec_ins,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="shls_spec_ins"
        label={t('fields.SpecialInstructions')}
        rules={[{ required: false, validator: validate }]}
      >
        <Input.TextArea />
      </Form.Item>
    </>
  );
};

export default SpecialInstructions;
