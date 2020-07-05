import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Input, Form } from 'antd';
import _ from 'lodash';

const InputNumber = ({ form, value, name, label, min, max, required, decimals }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

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

  useEffect(() => {
    if (value && setFieldsValue) {
      const index = value[name];

      const parsed = index !== '' ? _.toNumber(index) : '';
      const invalid = index !== '' && _.isNaN(parsed);

      if (!invalid) {
        setFieldsValue({
          [name]: parsed,
        });
      }
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name={name} label={label} rules={[{ validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default InputNumber;
