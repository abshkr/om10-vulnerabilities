import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';
import { REGEX } from '../../../../constants';

import { PERSONNEL } from '../../../../api';

const Code = ({ form, value, config }) => {
  const { t } = useTranslation();
  const { data, isValidating } = useSWR(PERSONNEL.READ);

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_code: value.per_code,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(data?.records, (object) => {
      const result = object.per_code.toLowerCase() === input?.toLowerCase();

      return result;
    });

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
    const regex = new RegExp(REGEX.ALPHANUMERIC_DOT);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumericDot')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthPsnlCode) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthPsnlCode} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="per_code" label={t('fields.code')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Code;
