import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { EXPIRY_DATES } from '../../../../api';

const TypeCode = ({ form, value }) => {
  const { data, isValidating } = useSWR(EXPIRY_DATES.READ);

  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    const match = _.find(data?.records, record => {
      return record.edt_type_code.toLowerCase() === input?.toLowerCase();
    });

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.typeCode')}`);
    }

    if (input && match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 32) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 32 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_type_code: value.edt_type_code
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="edt_type_code"
      label={t('fields.typeCode')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default TypeCode;
