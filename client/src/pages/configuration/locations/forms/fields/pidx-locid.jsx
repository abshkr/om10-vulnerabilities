import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { REGEX } from '../../../../../constants';

const PidxLocationIdentifier = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        term_pidx_locid: value.term_pidx_locid,
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

    const regex = new RegExp(REGEX.ALPHANUMERIC_NOSPACE);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumeric')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 12) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 12 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="term_pidx_locid"
      label={t('fields.termPidxLocId')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input />
    </Form.Item>
  );
};

export default PidxLocationIdentifier;
