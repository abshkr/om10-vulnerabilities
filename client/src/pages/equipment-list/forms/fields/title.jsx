import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Title = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_title: value.eqpt_title,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.title')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input != input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input != input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="eqpt_title" label={t('fields.title')} rules={[{ required: true, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default Title;
