import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { CUSTOMER_CATEGORIES } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: customerCategories } = useSWR(CUSTOMER_CATEGORIES.READ);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const match = _.find(customerCategories?.records, (object) => {
      return object.category_code?.toLowerCase() === input?.toLowerCase();
    });

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        category_code: value.category_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="category_code"
      label={t('fields.code')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default Code;
