import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { MOVEMENT_NOMIATIONS } from '../../../../api';

import { validatorStatus } from '../../../../utils';

const NominationKey = ({ form, value }) => {
  const [nomkey, setNomkey] = useState(value?.mv_key);
  const [matched, setMatched] = useState(false);
  const { t } = useTranslation();
  const { setFieldsValue, validateFields } = form;

  const { data, isValidating, revalidate } = useSWR(
    `${MOVEMENT_NOMIATIONS.CHECK_NOMKEY}?nomination_key=${nomkey}`,
    {
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_key: value.mv_key,
      });
    }
  }, [value, setFieldsValue]);

  const handleFieldChange = (event) => {
    setNomkey(event.target.value);
    revalidate();
  };

  useEffect(() => {
    revalidate();
  }, [nomkey, revalidate]);

  useEffect(() => {
    if (data) {
      const counter = _.toNumber(data?.records[0]?.cnt);
      const match = counter > 0;
      setMatched(match);
    }
  }, [data, setMatched]);

  useEffect(() => {
    if (nomkey?.length > 0) {
      validateFields(['mv_key']);
    }
  }, [matched, nomkey, validateFields]);

  const validate = (rule, input) => {
    if (matched && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.nominationKey')}`);
    }
    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }
    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 20 ─ ${t('descriptions.maxCharacters')}`);
    }
    return Promise.resolve();
  };

  const status = validatorStatus(isValidating, matched);

  return (
    <Form.Item
      name="mv_key"
      label={t('fields.nominationKey')}
      hasFeedback
      rules={[{ required: true, validator: validate }]}
      validateStatus={nomkey ? status : null}
      shouldUpdate
    >
      <Input disabled={!!value} onChange={handleFieldChange} />
    </Form.Item>
  );
};

export default NominationKey;
