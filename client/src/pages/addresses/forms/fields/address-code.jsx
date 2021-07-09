import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

import { ADDRESSES } from '../../../../api';

const AddressKey = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: addresses, isValidating } = useSWR(ADDRESSES.READ);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        db_address_key: value.db_address_key,
      });

      onChange(value.db_address_key);
    }
  }, [value, setFieldsValue, onChange]);

  const validate = (rule, input) => {
    const match = _.find(addresses?.records, ['db_address_key', input]);

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.addressCode')}`);
    }

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input && input.length > 20) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    return Promise.resolve();
  };

  const handleFieldChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Form.Item
      name="db_address_key"
      label={t('fields.addressCode')}
      rules={[{ required: true, validator: validate }]}
    >
      <Input disabled={!!value || isValidating} onChange={handleFieldChange} />
    </Form.Item>
  );
};

export default AddressKey;
