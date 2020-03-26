import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { TANKS } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: payload, isValidating } = useSWR(TANKS.READ);

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_code: value.tank_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(payload?.records, object => {
      return object.tank_code.toLowerCase() === input.toLowerCase();
    });

    if (input && match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && input.length > 12) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 12 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="tank_code" label={t('fields.code')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Code;
