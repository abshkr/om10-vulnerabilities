import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const Code = ({ form, value, data }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_code: value.tnkr_code
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    const match = _.find(data, ['tnkr_code', input]);

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
    <Form.Item name="tnkr_code" label={t('fields.code')} rules={[{ required: true, validator: validate }]}>
      <Input disabled={!!value} />
    </Form.Item>
  );
};

export default Code;
