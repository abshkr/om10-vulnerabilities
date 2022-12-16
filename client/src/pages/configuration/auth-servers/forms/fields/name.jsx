import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { notification } from 'antd';
import { validateRegexp } from '../../../../../utils';

const Name = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        as_name: value.as_name,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const errors = [];
    const t = rule.prompts;

    if ((rule.required && input === '') || (rule.required && !input)) {
      errors.push({
        key: rule.field + '_required',
        field: rule.title,
        message: `${t('validate.set')} ─ ${rule.title}`,
      });
    }

    if (input && rule.regexp !== undefined) {
      const regexpObj = validateRegexp(rule.regexp);
      const regex = new RegExp(regexpObj.pattern);
      const validated = regex.exec(input);

      if (!validated) {
        errors.push({
          key: rule.field + '_regexp',
          field: rule.title,
          message: `${t('validate.invalidInput')}: ${t('validate.' + regexpObj.message)}`,
        });
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (rule.maxLength !== undefined && rule.maxLength !== null && input && len > rule.maxLength) {
      errors.push({
        key: rule.field + '_maxlen',
        field: rule.title,
        message: `${t('placeholder.maxCharacters')}: ${rule.maxLength} ─ ${t('descriptions.maxCharacters')}`,
      });
    }

    if (rule.dataType === 'STRING') {
    }

    if (rule.dataType === 'NUMBER' && String(input).trim() !== '' && input !== undefined && input !== null) {
      const number = _.toNumber(input);
      const invalid = _.isNaN(number);

      const decimals = _.toString(number).split('.')[1]?.length || 0;

      if (input && input !== '' && invalid) {
        errors.push({
          key: rule.field + '_invalid',
          field: rule.title,
          message: `${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`,
        });
      }

      if (rule.precision !== undefined && rule.precision !== null && decimals > rule.precision) {
        errors.push({
          key: rule.field + '_precision',
          field: rule.title,
          message: `${t('validate.decimalPlacesExceeded')} ${rule.precision} ─ ${t(
            'descriptions.invalidDecimals'
          )}`,
        });
      }

      if (rule.max !== undefined && rule.max !== null && input !== '' && !invalid && number > rule.max) {
        errors.push({
          key: rule.field + '_maximum',
          field: rule.title,
          message: `${t('validate.outOfRangeMax')} ${rule.max} ─ ${t('descriptions.maxNumber')}`,
        });
      }

      if (rule.min !== undefined && rule.min !== null && input !== '' && !invalid && number < rule.min) {
        errors.push({
          key: rule.field + '_minimum',
          field: rule.title,
          message: `${t('validate.outOfRangeMin')} ${rule.min} ─ ${t('descriptions.minNumber')}`,
        });
      }
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    if (rule.returnType === 'notice') {
      if (errors.length > 0) {
        _.forEach(errors, (error) => {
          notification.error({
            message: error.field,
            description: error.message,
            key: error.key,
          });
        });
      }
      return errors;
    } else {
      if (errors.length > 0) {
        return Promise.reject(errors?.[0]?.message);
      } else {
        return Promise.resolve();
      }
    }
  };

  return (
    <Form.Item
      name="as_name"
      label={t('fields.asName')}
      rules={[
        {
          required: true,
          title: t('fields.asName'),
          dataType: 'STRING',
          maxLength: 200,
          precision: null,
          min: null,
          max: null,
          prompts: t,
          // regexp: 'ALPHANUMERIC',
          // regexp: 'DOCUMENT',
          // returnType: 'notice',
          validator: validate,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default Name;
