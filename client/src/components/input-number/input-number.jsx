import React from 'react';
import { Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const InputNumber = ({ name, label, min, max, required, decimals }) => {
  const { t } = useTranslation();

  const validate = (rule, input) => {
    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const precision = _.toString(number).split('.')[1]?.length || 0;

    if ((required && input === '') || (required && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${label}`);
    }

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (precision > decimals) {
      return Promise.reject(
        `${t('validate.outOfRange')}: ${decimals} ─ ${t('validate.decimalPlacesExceeded')}`
      );
    }

    if (!invalid && number > max) {
      return Promise.reject(`${t('validate.outOfRangeMax')} ${max} ─ ${t('descriptions.maxNumber')}`);
    }

    if (!invalid && number < min) {
      return Promise.reject(`${t('validate.outOfRangeMin')} ${min} ─ ${t('descriptions.minNumber')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name={name} label={label} rules={[{ validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default InputNumber;
