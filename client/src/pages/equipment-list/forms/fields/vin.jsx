import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { REGEX } from '../../../../constants';

const SLP = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        vin_number: value.vin_number
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC);
    if (!regex.exec(input)) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('descriptions.mustBeAlphaNumeric')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="vin_number" label={t('fields.vin')} rules={[{ required: false, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default SLP;
