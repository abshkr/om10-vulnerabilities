import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { EXPIRY_DATES } from '../../../../api';

const TypeCode = ({ form, value }) => {
  const { data, isValidating } = useSWR(EXPIRY_DATES.READ);

  const { getFieldDecorator, setFieldsValue } = form;

  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_type_code: value.edt_type_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data?.records, record => {
      return record.edt_type_code.toLowerCase() === input.toLowerCase();
    });

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.typeCode')}`);
    }

    if (input && match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 32) {
      callback(`${t('placeholder.maxCharacters')}: 32 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.typeCode')}>
      {getFieldDecorator('edt_type_code', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default TypeCode;
