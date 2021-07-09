import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { EQUIPMENT_LIST } from '../../../../api';
import { REGEX } from '../../../../constants';

import { validatorStatus } from '../../../../utils';

const Code = ({ form, value, config }) => {
  const [eqptCode, setEqptCode] = useState(value?.eqpt_code);
  const [matched, setMatched] = useState(false);
  const { t } = useTranslation();

  const { data, isValidating, revalidate } = useSWR(
    `${EQUIPMENT_LIST.CHECK_EQPT_CODE}?eqpt_code=${eqptCode}`
  );

  const { setFieldsValue, validateFields } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_code: value.eqpt_code,
        eqpt_id: value.eqpt_id,
      });
    }
  }, [value, setFieldsValue]);

  const handleFieldChange = (event) => {
    setEqptCode(event.target.value);
    revalidate();
  };

  useEffect(() => {
    revalidate();
  }, [eqptCode, revalidate]);

  useEffect(() => {
    if (data) {
      const counter = _.toNumber(data?.records[0]?.cnt);
      const match = counter > 0;
      setMatched(match);
    }
  }, [data, setMatched]);

  // this part is crucial for the instant verification of value
  useEffect(() => {
    if (eqptCode?.length > 0) {
      validateFields(['eqpt_code']);
    }
  }, [matched, eqptCode, validateFields]);

  const validate = (rule, input) => {
    console.log('eqpt code validate');
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

    // const regex = new RegExp(REGEX.ALPHANUMERIC_SPECIAL_NOSQ);
    const regex = new RegExp(REGEX.DOCUMENT);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextDocument')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthEqptCode) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthEqptCode} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  const status = validatorStatus(isValidating, matched);

  return (
    <div>
      <Form.Item
        name="eqpt_code"
        label={t('fields.code')}
        hasFeedback
        rules={[{ required: true, validator: validate }]}
        validateStatus={eqptCode ? status : null}
        shouldUpdate
      >
        <Input disabled={!!value} onChange={handleFieldChange} />
      </Form.Item>
      <Form.Item name="eqpt_id" noStyle>
        <Input type="hidden" />
      </Form.Item>
    </div>
  );
};

export default Code;
