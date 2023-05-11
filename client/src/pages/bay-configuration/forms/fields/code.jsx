import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { BAY_CONFIGURATION } from '../../../../api';
import { REGEX } from '../../../../constants';

const Code = ({ form, value, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: bays, isValidating } = useSWR(BAY_CONFIGURATION.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        ba_code: value.ba_code,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(bays?.records, (record) => {
      return record.ba_code.toLowerCase() === input?.toLowerCase();
    });

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const regex = new RegExp(REGEX.BAYCODE);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('descriptions.regexpTextBaycode')}`);
    }

    if (!!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.bayCode')}`);
    }

    const maxLengthBayCode = 12;
    const len = new TextEncoder().encode(input).length;
    if (input && len > maxLengthBayCode) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${maxLengthBayCode} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="ba_code" label={t('fields.bayCode')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Code;
