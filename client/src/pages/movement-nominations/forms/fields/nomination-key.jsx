import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const NominationKey = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  const { data: movementNominations, isValidating } = useSWR(MOVEMENT_NOMIATIONS.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_key: value.mv_key
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(movementNominations?.records, ['mv_key', input]);

    if (input === '' || !input) {
      callback(`${t('validate.set')} ─ ${t('fields.nominationKey')}`);
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
    <Form.Item label={t('fields.nominationKey')}>
      {getFieldDecorator('mv_key', {
        rules: [{ required: true, validator: validate }]
      })(<Input disabled={!!value || isValidating} />)}
    </Form.Item>
  );
};

export default NominationKey;
