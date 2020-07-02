import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { EQUIPMENT_LIST } from '../../../../api';

const Code = ({ form, value }) => {
  const { t } = useTranslation();
  const { data, isValidating } = useSWR(EQUIPMENT_LIST.READ);

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_code: value.eqpt_code,
        eqpt_id: value.eqpt_id,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    const match = _.find(data?.records, ['eqpt_code', input]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.code')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <div>
      <Form.Item name="eqpt_code" label={t('fields.code')} rules={[{ required: true, validator: validate }]}>
        <Input disabled={!!value || isValidating} />
      </Form.Item>
      <Form.Item name="eqpt_id" noStyle>
        <Input type="hidden" />
      </Form.Item>
    </div>
  );
};

export default Code;
