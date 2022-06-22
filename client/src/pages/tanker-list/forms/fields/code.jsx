import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { REGEX } from '../../../../constants';

const Code = ({ form, value, tankers, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_code: value.tnkr_code,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(tankers, ['tnkr_code', input]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }
    // const regex = new RegExp(REGEX.ALPHANUMERIC_SPECIAL_NOSQ);
    const regex = new RegExp(REGEX.DOCUMENT);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextDocument')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthTnkrCode) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthTnkrCode} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="tnkr_code" label={t('fields.code')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default Code;
