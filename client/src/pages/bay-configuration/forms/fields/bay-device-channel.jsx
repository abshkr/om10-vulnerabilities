import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { REGEX } from '../../../../constants';

const BayDeviceChannel = ({ form, value, disabled }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bad_channel: value.bad_channel,
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
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumericNoSpace')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="bad_channel"
      label={t('fields.bayDeviceChannel')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input disabled={disabled} />
    </Form.Item>
  );
};

export default BayDeviceChannel;
