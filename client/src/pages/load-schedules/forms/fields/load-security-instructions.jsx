import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

import { REGEX } from '../../../../constants';

const LoadSecurityInformation = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.loadSecurityInformation')}`);
      }
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC_HOSTCOMM);
    const validated = regex.exec(input);
    if (!validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumericHostcomm')}`);
      // return Promise.reject(`${t('validate.invalidInput')}: \>\`\'\&\<`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 120) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 120 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        shls_load_security_info: value?.shls_load_security_info,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="shls_load_security_info"
        label={t('fields.loadSecurityInformation')}
        rules={[{ required: false, validator: validate }]}
      >
        <Input.TextArea />
      </Form.Item>
    </>
  );
};

export default LoadSecurityInformation;
