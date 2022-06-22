import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { BASE_PRODUCTS } from '../../../../api';
import { REGEX } from '../../../../constants';

const Code = ({ form, value, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: baseProducts, isValidating } = useSWR(BASE_PRODUCTS.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        base_code: value.base_code,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(baseProducts?.records, (record) => {
      return record.base_code.toLowerCase() === input?.toLowerCase();
    });

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

    if (!!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.baseProdCode')}`);
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
      name="base_code"
      label={t('fields.baseProdCode')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Code;
