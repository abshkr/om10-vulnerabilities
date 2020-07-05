import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Input, Form } from 'antd';
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
  style,
  disabled,
  allowClear,
  maxLength,
  onChange,
  onPressEnter
}) => {
  const { t } = useTranslation();

  // const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const number = _.toNumber(input);
    const invalid = _.isNaN(number);

    const decimals = _.toString(number).split('.')[1]?.length || 0;
    console.log('Custom InputNumber Validation', decimals, precision, input);

    if ((required && input === '') || (required && !input)) {
      return Promise.reject(`${t('validate.set')} ─ ${label}`);
    }

    if (maxLength != undefined && input && input.length > maxLength) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: ${maxLength} ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input && input !== '' && invalid) {
      return Promise.reject(`${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`);
    }

    if (precision !== undefined && decimals > precision) {
      return Promise.reject(`${t('validate.decimalPlacesExceeded')} ${precision} ─ ${t('descriptions.invalidDecimals')}`);
    }

    if (max !== undefined && input !== '' && !invalid && number > max) {
      return Promise.reject(`${t('validate.outOfRangeMax')} ${max} ─ ${t('descriptions.maxNumber')}`);
    }

    if (min !== undefined && input !== '' && !invalid && number < min) {
      return Promise.reject(`${t('validate.outOfRangeMin')} ${min} ─ ${t('descriptions.minNumber')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    console.log('handleValueChange in InputNumber', value);
//    if (value && setFieldsValue) {
    if (value || value === 0) {
      let index = value;
      if (_.isObject(value) && value.hasOwnProperty(name)) {
        index = value[name];
      }

      let parsed = index !== '' ? _.toNumber(index) : '';
      const invalid = index !== '' && _.isNaN(parsed);

      if (!invalid) {
        console.log('need rounding', precision);
        if (precision !== undefined && parsed !== '') {
          console.log('before rounding', parsed);
          parsed = _.round(parsed, precision);
          console.log('after rounding', parsed);
        }
        form.setFieldsValue({
          [name]: parsed,
        });
      }
    }
  }, [value]);
//  }, [value, setFieldsValue]);

  const handleValueChange = (event) => {
    //console.log('handleValueChange in InputNumber', event?.target?.value);
    //console.log('handleValueChange in InputNumber', onChange);
    if (_.isFunction(onChange)) {
       onChange(event?.target?.value);
    }
  }

  const handlePressEnter = (event) => {
    //console.log('handlePressEnter in InputNumber', event?.target?.value);
    if (_.isFunction(onPressEnter)) {
      onPressEnter(event?.target?.value);
    }
  }

  return (
    <Form.Item name={name} label={label} rules={[{ required: required, validator: validate }]}>
      <Input 
        //type="number"
        id={id}
        style={style}
        disabled={disabled}
        allowClear={allowClear}
        //maxLength={maxLength}
        onChange={handleValueChange}
        onPressEnter={handlePressEnter}
      />
    </Form.Item>
  );
};

export default InputNumber;
