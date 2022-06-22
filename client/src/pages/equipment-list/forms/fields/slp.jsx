import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { REGEX } from '../../../../constants';

const SLP = ({ form, value, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        slp_id: value.slp_id,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const len = new TextEncoder().encode(input).length;
    if (input && len > config?.maxLengthSLP) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${config?.maxLengthSLP} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    const regex = new RegExp(REGEX.NUMERIC_CHARS);
    if (input && input.length > 0 && !regex.exec(input)) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('descriptions.mustBeNumber')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="slp_id" label={t('fields.slp')} rules={[{ required: false, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default SLP;
