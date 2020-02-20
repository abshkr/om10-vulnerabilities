import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { PERSONNEL } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();
  const { data, isValidating } = useSWR(PERSONNEL.READ);

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_code: value.per_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data?.records, ['per_code', input]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && !!match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 12) {
      callback(`${t('placeholder.maxCharacters')}: 12 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.code')}>
      {getFieldDecorator('per_code', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default Code;
