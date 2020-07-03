import React, { useEffect } from 'react';
import { Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const InputNumber = ({ 
  form,
  value,
  name,
  label,
  min,
  max,
  precision,
  required,
  id,
  disabled,
  allowClear,
  maxLength,
  onChange,
  onPressEnter
}) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;
    console.log('Custom InputNumber Validation', decimals, precision);

    if ((required && input === '') || (required && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${label}`);
    }

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (decimals > precision) {
      return Promise.reject(`${t('validate.decimalPlacesExceeded')} ${precision} ─ ${t('descriptions.invalidDecimals')}`);
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
    <Form.Item name={name} label={label} rules={[{ required: required, validator: validate }]}>
      <Input 
        id={id}
        disabled={disabled}
        allowClear={allowClear}
        maxLength={maxLength}
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
    </Form.Item>
  );
};

export default InputNumber;
