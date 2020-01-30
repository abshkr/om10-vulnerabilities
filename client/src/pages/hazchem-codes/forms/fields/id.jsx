import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';
import useSWR from 'swr';

import { HAZCHEM_CODES } from '../../../../api';

const Id = ({ form, value }) => {
  const { t } = useTranslation();
  const { getFieldDecorator, setFieldsValue } = form;
  const { data: payload, isValidating } = useSWR(HAZCHEM_CODES.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        hzcf_id: value.hzcf_id
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(payload?.records, ['hzcf_id', input]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.id')}`);
    }

    if (input && !!match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 20) {
      callback(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.id')}>
      {getFieldDecorator('hzcf_id', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default Id;
