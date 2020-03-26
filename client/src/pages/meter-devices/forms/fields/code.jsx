import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { METER_DEVICES } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: payload, isValidating } = useSWR(METER_DEVICES.READ);

  const validate = (rule, input) => {
    const match = _.find(payload?.records, record => {
      return record?.mtd_code === input;
    });

    if (!!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && input.length > 4) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 4 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mtd_code: value.mtd_code
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="mtd_code" label={t('fields.code')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={isValidating} />
    </Form.Item>
  );
};

export default Code;
