import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const Name = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.meterName')}`);
    }

    if (input && input.length > 32) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 30 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bam_name: value.bam_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="bam_name"
      label={t('fields.meterName')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default Name;
