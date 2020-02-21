import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { TANKS } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: payload, isValidating } = useSWR(TANKS.READ);

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_code: value.tank_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(payload?.records, object => {
      return object.tank_code.toLowerCase() === input.toLowerCase();
    });

    if (input && match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && input.length > 6) {
      callback(`${t('placeholder.maxCharacters')}: 6 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.code')}>
      {getFieldDecorator('tank_code', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default Code;
