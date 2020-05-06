import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { PRODUCT_GROUPS } from '../../../../api';

const Code = ({ form, value }) => {
  const { data, isValidating } = useSWR(PRODUCT_GROUPS.READ_GROUPS);

  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    const match = _.find(data?.records, (record) => {
      return record.pgr_code.toLowerCase() === input?.toLowerCase();
    });

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
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
        pgr_code: value.pgr_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="pgr_code" label={t('fields.code')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Code;
