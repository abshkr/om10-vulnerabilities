import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { REGEX } from '../../../../constants';

const RefCode = ({ form, value, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_ref_code: value.base_ref_code,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('descriptions.mustBeAlphaNumeric')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthBaseCode) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthBaseCode} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="base_ref_code"
      label={t('fields.baseProdRefCode')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default RefCode;
