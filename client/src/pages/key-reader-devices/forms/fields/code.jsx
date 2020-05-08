import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { KEY_READER_DEVICES } from '../../../../api';

const Code = ({ value }) => {
  const { t } = useTranslation();
  const { data: payload, isValidating } = useSWR(KEY_READER_DEVICES.READ);

  const validate = (rule, input) => {
    const match = _.find(payload?.records, (object) => {
      return object.adv_code.toLowerCase() === input.toLowerCase();
    });

    if (input && match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && input.length > 3) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 3 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="adv_code" label={t('fields.code')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Code;
