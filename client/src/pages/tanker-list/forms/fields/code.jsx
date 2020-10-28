import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { REGEX } from '../../../../constants';

const Code = ({ form, value, data }) => {
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
    const match = _.find(data, ['tnkr_code', input]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    // const regex = new RegExp(REGEX.ALPHANUMERIC_SPECIAL_NOSQ);
    const regex = new RegExp(REGEX.DOCUMENT);
    const validated = regex.exec(input);

    if (!validated) {
      return Promise.reject(
        `${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumericSpecialNoSingleQuote')}`
      );
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
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
