import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { REGEX } from '../../../../../constants';

const URL = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        as_ip: value.as_ip,
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

    /* const regex = new RegExp(REGEX.ALPHANUMERIC);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('descriptions.mustBeAlphaNumeric')}`);
    } */

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.asIP')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 256) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: ${256} ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="as_ip" label={t('fields.asIP')} rules={[{ required: true, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default URL;
