import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { DELV_LOCATIONS } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: delvLocations, isValidating } = useSWR(DELV_LOCATIONS.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_code: value.delv_code,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(delvLocations?.records, (record) => {
      return record.delv_code.toLowerCase() === input?.toLowerCase();
    });

    if (!!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.delvCode')}`);
    }

    if (input && input.length > 16) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 16 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input != input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input != input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="delv_code"
      label={t('fields.delvCode')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Code;
