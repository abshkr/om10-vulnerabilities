import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const NominationKey = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: movementNominations, isValidating } = useSWR(MOVEMENT_NOMIATIONS.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_key: value.mv_key
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(movementNominations?.records, ['mv_key', input]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.nominationKey')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="mv_key"
      label={t('fields.nominationKey')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default NominationKey;
