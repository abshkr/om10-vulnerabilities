import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { LOAD_METERS } from '../../../../api';

const Code = ({ form, value }) => {
  const { data, isValidating } = useSWR(LOAD_METERS.READ);

  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, input) => {
    const match = _.find(data?.records, (record) => {
      return record.bam_code.toLowerCase() === input?.toLowerCase();
    });

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.meterCode')}`);
    }

    if (input && match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 32) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 32 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bam_code: value.bam_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="bam_code"
      label={t('fields.meterCode')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} />
    </Form.Item>
  );
};

export default Code;
