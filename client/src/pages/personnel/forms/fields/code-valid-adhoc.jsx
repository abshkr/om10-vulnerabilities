import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { PERSONNEL } from '../../../../api';
import { REGEX } from '../../../../constants';

import { validatorStatus } from '../../../../utils';

const Code = ({ form, value, config }) => {
  const [psnlCode, setPsnlCode] = useState(value?.per_code);
  const [matched, setMatched] = useState(false);
  const { t } = useTranslation();

  const { data, isValidating, revalidate } = useSWR(`${PERSONNEL.CHECK_PSNL_CODE}?psnl_code=${psnlCode}`);

  const { setFieldsValue, validateFields } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_code: value.per_code,
      });
    }
  }, [value, setFieldsValue]);

  const handleFieldChange = (event) => {
    setPsnlCode(event.target.value);
    revalidate();
  };

  useEffect(() => {
    revalidate();
  }, [psnlCode, revalidate]);

  useEffect(() => {
    if (data) {
      const counter = _.toNumber(data?.records[0]?.cnt);
      const match = counter > 0;
      setMatched(match);
    }
  }, [data, setMatched]);

  // this part is crucial for the instant verification of value
  useEffect(() => {
    if (psnlCode?.length > 0) {
      validateFields(['per_code']);
    }
  }, [matched, psnlCode, validateFields]);

  const validate = (rule, input) => {
    console.log('personnel code validate');
    if (matched && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC_DOT);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
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

  const status = validatorStatus(isValidating, matched);

  return (
    <div>
      <Form.Item
        name="per_code"
        label={t('fields.code')}
        hasFeedback
        rules={[{ required: true, validator: validate }]}
        validateStatus={psnlCode ? status : null}
        shouldUpdate
      >
        <Input disabled={!!value} onChange={handleFieldChange} />
      </Form.Item>
    </div>
  );
};

export default Code;
