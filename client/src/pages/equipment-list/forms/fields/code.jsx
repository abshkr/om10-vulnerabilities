import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { EQUIPMENT_LIST } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();
  const { data, isValidating } = useSWR(EQUIPMENT_LIST.READ);

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_code: value.eqpt_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data?.records, ['eqpt_code', input]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && !!match && !value) {
      callback(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 40) {
      callback(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.code')}>
      {getFieldDecorator('eqpt_code', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default Code;
